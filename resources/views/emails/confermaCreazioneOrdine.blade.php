<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Infogeneration">
    <title>Conferma creazione</title>
    <style>
        body {
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            color: #333;
        }

        .email-container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #e4e4e4;
        }

        .header img {
            max-width: 150px;
            height: auto;
        }

        .content {
            padding: 20px 0;
            text-align: center;
            font-size: 16px;
            line-height: 1.6;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #e4e4e4;
            padding-top: 10px;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                width: 90%;
                padding: 10px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <img src="{{ $message->embed(public_path() . '/assets/img/ODONTOTECNICA-LOGO.png') }}" />
        </div>
        <div class="content">
            <p>Il tuo ordine è stato creato con successo e verrà processato il prima possibile.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Centro Medico San Pietro. Tutti i diritti riservati.</p>
        </div>
    </div>
</body>

</html>