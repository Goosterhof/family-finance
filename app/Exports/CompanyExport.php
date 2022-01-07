<?php

namespace App\Exports;

use App\Models\Company;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CompanyExport implements WithMultipleSheets
{
    use Exportable;

    protected Company $company;

    /**
     * The constructor
     *
     * @param Company $company
     */
    public function __construct(Company $company)
    {
        $this->company = $company;
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
