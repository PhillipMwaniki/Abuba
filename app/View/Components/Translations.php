<?php

namespace App\View\Components;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\View\Component;

class Translations extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        $locale = App::getLocale();
        $translations = [];

        if (File::exists(lang_path("$locale"))) {
            $translations = collect(File::allFiles(lang_path("$locale")))
                ->filter(function ($file) {
                    return $file->getExtension() === "php";
                })->flatMap(function ($file) {
                    return Arr::dot(File::getRequire($file->getRealPath()));
                })->toArray();
        }
        return view('components.translations', ['translations' => $translations]);
    }
}