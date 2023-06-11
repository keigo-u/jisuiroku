<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\Contacted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Contact;
use Illuminate\Mail\Mailables\Address;

class ContactController extends Controller
{
    /**
     * お問い合わせの保存・メール送信
     *
     * @param ContactRequest $request
     * @return void
     */
    public function store(ContactRequest $request)
    {
        $contact = Contact::create($request->all());

        try {

            Mail::to(new Address('keigo.u88@gmail.com', 'Keigo Unuma'))->send(new Contacted($contact)); // メール送信

        } catch (\Exception $e) {

            throw $e;
            return response()->json($e, 500);
        }

        return response()->json($contact, 200);
    }
}
