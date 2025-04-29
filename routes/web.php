<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OperatoreController;
use App\Http\Controllers\OrdineController;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\Facades\Route;

// ========================
//  ROTTE DI AUTENTICAZIONE
// ========================
Route::group(['middleware' => RedirectIfAuthenticated::class], function () {
    Route::get('/', fn() => redirect()->intended("/login"));
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post("/login", [LoginController::class, "login"])->name('loginUser');
});

// ========================
//  ROTTE CLIENTE
// ========================
Route::group(['middleware' => "auth:cliente"], function () {
    // Dashboard
    Route::get("/cliente/dashboard", [ClienteController::class, "showDashboard"])->name("clienteDashboard");

    // Ordini - Creazione
    Route::get("/cliente/ordini/creazione", [ClienteController::class, "showCreazioneOrdine"])->name("paginaCreazioneOrdine");
    Route::post('/cliente/ordini/creazione', [OrdineController::class, 'creazione'])->name('creazioneOrdine');

    // Ordini - Visualizzazione
    Route::get("/cliente/ordini/storico/{tempo?}", [ClienteController::class, "getStoricoOrdini"])->name("tabellaStoricoOrdini");

    // Ordini - Download e PDF
    Route::get('/cliente/ordini/pdf/{id}', [OrdineController::class, 'generaPDF'])->name('clienteGeneraPDF');
    Route::get('/cliente/ordini/download/{id}', [OrdineController::class, 'downloadFile'])->name('downloadFileCliente');
    Route::get('/cliente/ordini/download-finale/{id}', [OrdineController::class, 'downloadFileFinale'])->name('downloadFileFinaleCliente');

    // Logout
    Route::post("/cliente/logout", [LoginController::class, "logout"])->name('logoutCliente');
});

// ========================
//  ROTTE OPERATORE
// ========================
Route::group(['middleware' => "auth:operatore"], function () {
    // Dashboard
    Route::get("/operatore/dashboard", [OperatoreController::class, "showDashboard"])->name("operatoreDashboard");

    // Lavori
    Route::get('/operatore/lavori/contatore-nuovi', [OrdineController::class, 'getNumeroLavori'])->name('getNumeroLavori');
    Route::get('/operatore/lavori/accettazione/{id}', [OperatoreController::class, 'showAccettazioneOrdineModal'])->name('showAccettazioneOrdineModal');
    Route::get('/operatore/lavori/spedizione/{id}', [OperatoreController::class, 'showSpedizioneOrdineModal'])->name('showSpedizioneOrdineModal');
    Route::get('/operatore/lavori/reset/{id}', [OperatoreController::class, 'showResetOrdineModal'])->name('showResetOrdineModal');
    Route::get('/operatore/lavori/eliminazione/{id}', [OperatoreController::class, 'showEliminazioneOrdineModal'])->name('showEliminazioneOrdineModal');
    Route::delete('/operatore/lavori/eliminazione/{id}', [OperatoreController::class, 'deleteOrdine'])->name('deleteOrdine');
    Route::get('/operatore/lavori/{tipo}', [OperatoreController::class, 'showLavori'])->name('showLavori');

    // Gestione clienti
    Route::get('/operatore/gestione-clienti', [OperatoreController::class, 'showGestioneClienti'])->name('showGestioneClienti');
    Route::get('/operatore/gestione-clienti/eliminazione/{id}', [OperatoreController::class, 'showEliminazioneClienteModal'])->name('showEliminazioneClienteModal');
    Route::delete('/operatore/gestione-clienti/eliminazione/{id}', [OperatoreController::class, 'deleteCliente'])->name('deleteCliente');
    Route::get('/operatore/gestione-clienti/{azione}/{id?}', [OperatoreController::class, 'showAzioneClienteModal'])->name('showAzioneClienteModal');
    Route::post('/operatore/gestione-clienti/creazione', [OperatoreController::class, 'createCliente'])->name('createCliente');
    Route::patch('/operatore/gestione-clienti/modifica/{id}', [OperatoreController::class, 'patchCliente'])->name('patchCliente');

    // Ordini clienti
    Route::get('/operatore/ordini-clienti/{id?}', [OperatoreController::class, 'showOrdiniCliente'])->name('tabellaOrdiniCliente');
    Route::get('/operatore/ordini-clienti/pdf/{id}', [OrdineController::class, 'generaPDF'])->name('operatoreGeneraPDF');
    Route::patch('/operatore/ordini-clienti/update/{id}/{option}', [OrdineController::class, 'aggiornaStato'])->name('aggiornaStato');
    Route::get('/operatore/ordini-clienti/download/{id}', [OrdineController::class, 'downloadFile'])->name('downloadFileOperatore');
    Route::get('/operatore/ordini-clienti/download-finale/{id}', [OrdineController::class, 'downloadFileFinale'])->name('downloadFileFinaleOperatore');
    Route::get('/operatore/ordini-clienti/caricamento-lavorazione/{id}', [OperatoreController::class, 'showLavorazioneModal'])->name('showLavorazioneModal');
    Route::post('/operatore/ordini-clienti/caricamento-lavorazione/{id}', [OperatoreController::class, 'caricaLavorazione'])->name('caricaLavorazione');

    // Logout
    Route::post("/operatore/logout", [LoginController::class, "logout"])->name('logoutOperatore');
});
