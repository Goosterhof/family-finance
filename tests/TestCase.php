<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * Undocumented function
     *
     * @return void
     */
    protected function refreshTestDatabase()
    {
        // if (!RefreshDatabaseState::$migrated) {
        //     // DB::unprepared(file_get_contents(database_path('migrations/dump.sql')));
        //     // $this->artisan('migrate');

        //     $this->artisan('migrate:fresh');
        //     $this->app[Kernel::class]->setArtisan(null);
        //     RefreshDatabaseState::$migrated = true;
        // }

        // $this->beginDatabaseTransaction();
    }
}
