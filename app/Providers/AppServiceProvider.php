<?php

namespace App\Providers;

use App\Models\Insurer;
use App\Models\LookupValue;
use App\Models\LeadSource;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(function (\SocialiteProviders\Manager\SocialiteWasCalled $event): void {
            $event->extendSocialite('azure', \SocialiteProviders\Azure\Provider::class);
        });

        View::composer('*', function ($view): void {
            $insuranceCompanies = collect();
            $leadSources = collect();
            $advisers = collect();
            $categoryMasterOptions = collect();

            if (Schema::hasTable('lookup_values')) {
                $categoryMasterOptions = LookupValue::query()
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('name')
                    ->get()
                    ->groupBy('group')
                    ->map(fn ($values) => $values->pluck('name')->values());

                $insuranceCompanies = LookupValue::query()
                    ->where('group', 'insurance_company')
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('name')
                    ->get();
            } elseif (Schema::hasTable('insurers')) {
                $insuranceCompanies = Insurer::where('is_active', true)->orderBy('name')->get();
            }

            // Get lead sources from the dedicated lead_sources table
            if (Schema::hasTable('lead_sources')) {
                $leadSources = LeadSource::where('is_active', true)
                    ->orderBy('name')
                    ->get();
            } elseif (Schema::hasTable('lookup_values')) {
                // Fallback: if lead_sources table doesn't exist, use lookup_values
                     
                $leadSources = LookupValue::query()
                    ->where('group', 'lead_source')
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('name')
                    ->get();
            
            }
                
            // Get advisers for all dropdowns
            if (Schema::hasTable('users')) {
                $advisers = \App\Models\User::whereHas('role', function ($query) {
                    $query->where('slug', 'advisor')
                        ->orWhere('slug', 'insurance-advisor')
                        ->orWhere('name', 'like', '%advisor%')
                        ->orWhere('name', 'like', '%adviser%');
                })->where('status', 'Active')->orderBy('name')->pluck('name');
            }

            $view->with('insuranceCompanies', $insuranceCompanies);
             $view->with('leadSources', $leadSources);
            $view->with('advisers', $advisers);
            $view->with('categoryMasterOptions', $categoryMasterOptions);
        });
    }
}
