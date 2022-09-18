<?php

declare(strict_types = 1);

namespace App\Exports;

use App\Models\Profile;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class ProfileExport implements FromArray, WithHeadings, WithMapping, WithTitle, ShouldAutoSize
{
    /**
     * The constructor
     *
     * @param Profile $profile
     */
    public function __construct(protected Profile $profile)
    {
    }

    /**
     * The headings for the sheet
     *
     * @return array
     */
    public function headings(): array
    {
        $array = [
            'Bedrijf',
            'Profielnaam',
            $this->profile->min_age ? 'Min leeftijd' : '',
            $this->profile->max_age ? 'Max leeftijd' : '',
            $this->profile->years_since_work ? 'Max jaren geleden werkervaring' : '',
            $this->profile->years_relevant_work_exp ? 'Jaren relevante werkervaring' : '',
            $this->profile->desiredProfessions->count() > 0 ? 'Gewenste beroepen' : '',
            $this->profile->experienceProfessions->count() > 0 ? 'Werkervaring' : '',
            $this->profile->driverslicense->count() > 0 ? 'Rijbewijzen' : '',
            $this->profile->educations->count() > 0 ? 'Opleidingen' : '',
            $this->profile->zipcodes->count() > 0 ? 'Postcodes' : '',
            $this->profile->emails->count() > 0 ? 'Emails' : '',
        ];
        $array = array_filter($array, function ($header) {
            return !!$header;
        });
        return $array;
    }

    /**
     * Map the profile to the headings
     *
     * @param mixed $profile
     *
     * @return array
     */
    public function map($profile): array
    {
        return array_map(function ($header) use ($profile) {
            return array_key_exists($header, $profile) ? $profile[$header] : '';
        }, $this->headings());
    }

    /**
     * Make an array for the sheet
     *
     * @return array
     */
    public function array(): array
    {
        $array = [
            0 => [
                'Bedrijf' => $this->profile->company->name,
                'Profielnaam' => $this->profile->name,
                'Min leeftijd' => $this->profile->min_age,
                'Max leeftijd' => $this->profile->max_age,
                'Max jaren geleden werkervaring' => $this->profile->years_since_work,
                'Jaren relevante werkervaring' => $this->profile->years_relevant_work_exp,
            ],
        ];

        $this->mapper($array, 'Gewenste beroepen', $this->profile->desiredProfessions->values());
        $this->mapper($array, 'Werkervaring', $this->profile->experienceProfessions->values());
        $this->mapper($array, 'Opleidingen', $this->profile->educations->values());
        $this->mapper($array, 'Rijbewijzen', $this->profile->driverslicense->values());
        $this->mapper($array, 'Emails', $this->profile->emails->values());

        $this->profile->zipcodes->values()->each(function ($postcode, $key) use (&$array) {
            if (!array_key_exists($key, $array)) {
                $array[$key] = [];
            }
            $array[$key]['Postcodes'] = $postcode['from'] . '-' . $postcode['to'];
        });

        return $array;
    }

    /**
     * Create the title for the sheet
     *
     * @return string
     */
    public function title(): string
    {
        return substr(preg_replace('/[^A-Za-z0-9\-]/', '', $this->profile->name), 0, 31);
    }

    /**
     * Map everything
     *
     * @param array  $array
     * @param string $header
     * @param object $values
     *
     * @return void
     */
    private function mapper(array &$array, string $header, $values)
    {
        $values->each(function ($value, $key) use (&$array, $header) {
            if (!array_key_exists($key, $array)) {
                $array[$key] = [];
            }
            $array[$key][$header] = $value['name'];
        });
    }
}
