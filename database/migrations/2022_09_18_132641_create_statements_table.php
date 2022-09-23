<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// "IBAN/BBAN",
// "Volgnr",
// "Datum",
// "Bedrag",
// "Saldo na trn",
// "Tegenrekening IBAN/BBAN",
// "Naam tegenpartij",
// "Omschrijving-1",

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statements', function (Blueprint $table) {
            $table->id();
            // TODO :: should become foreign
            $table->string('account');
            $table->string('bank_id');
            $table->date('transaction_date');
            $table->float('amount');
            $table->float('balance_after');
            // TODO :: should become foreign
            $table->string('to_account')->nullable();
            $table->string('to_account_name');
            $table->string('description')->nullable();
            $table->foreignId('category_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('statements');
    }
};
