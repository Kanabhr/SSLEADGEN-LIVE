@extends('layouts.app')
@section('title', 'Business Analytics')
@section('content')
<div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div>
                    <h4 class="fw-bold text-dark mb-1">Performance Analytics & Insights</h4>
                    <p class="text-muted fs-13 mb-0">Annual growth metrics, premium distributions, and lead conversion rates.</p>
                </div>
                <button class="btn btn-outline-primary btn-sm px-3 fw-bold" onclick="alert('Report PDF Generated!')"><i class="feather-download me-1"></i> Export Analytics Report</button>
            </div>

            <div class="row g-4">
                <div class="col-lg-8">
                    <div class="card-widget p-4">
                        <h6 class="widget-title mb-3">Annual Premium Growth ($ Millions)</h6>
                        <div id="analyticsGrowthChart" style="min-height: 280px;"></div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card-widget p-4">
                        <h6 class="widget-title mb-3">Lead Conversion Rates</h6>
                        <div id="analyticsConversionChart" style="min-height: 280px;"></div>
                    </div>
                </div>
            



@push('scripts')
    <script src="{{ asset('assets/js/dashboard-redesign.js') }}"></script>
    <script src="{{ asset('assets/js/pages/analytics.js') }}"></script>
@endpush

@endsection