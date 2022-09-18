<?php

declare(strict_types = 1);

namespace App\Exports;

use App\Models\Company;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CompanyExport implements WithMultipleSheets
{
    use Exportable;

    /**
     * The constructor
     *
     * @param Company $company
     */
    public function __construct(protected Company $company)
    {
    }

    /**
     * Create many sheets
     *
     * @return \Illuminate\Support\Collection
     */
    public function sheets(): array
    {
        $sheets = [];

        foreach ($this->company->profiles as $profile) {
            $sheets[] = new ProfileExport($profile);
        }

        return $sheets;
    }
}
