    <?php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use Illuminate\Support\Facades\Http;
    use Illuminate\Support\Facades\Mail;
    /*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider and all of them will
    | be assigned to the "api" middleware group. Make something great!
    |
    */

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/send-telegram-message', function (Request $request) {
        $message = "Вам пришла новая заявка на обратную связь\n\n";
        $message .= "Имя: " . $request->name . "\n";
        $message .= "Телефон: " . $request->phone . "\n";
        $message .= "Время: " . ($request->time ?: 'Не указано') . "\n";
        $message .= "Email: " . ($request->email ?: 'Не указано') . "\n";
        $tg_endpoint = 'https://api.telegram.org/bot' . env('TELEGRAM_BOT_TOKEN') . '/sendMessage';
        $response = Http::post($tg_endpoint, [
            'chat_id' => env('TELEGRAM_CHAT_ID'),
            'text' => $message,
        ]);

        Mail::raw($message, function ($message) {
            $message->from(env('MAIL_USERNAME'))
                ->to(env('EMAIL_TO_ADDRESS'))
                ->subject('Новая заявка на обратную связь');
        });
        return response()->json(['message' => 'Message sent']);
    });
