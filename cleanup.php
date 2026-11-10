<?php
$viewsDir = __DIR__ . '/resources/views/pages';
$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($viewsDir));

foreach ($it as $file) {
    if ($file->isFile() && $file->getExtension() === 'php') {
        $content = file_get_contents($file->getPathname());
        
        // Remove rogue </div> and footer comments at the end before @endsection
        $content = preg_replace('/<\/div>\s*<!-- RESPONSIVE FOOTER.*?-->\s*@endsection/is', '@endsection', $content);
        // Sometimes it might just be </div> before @endsection
        $content = preg_replace('/<\/div>\s*@endsection/is', '@endsection', $content);
        
        // Let's also check if any other extraneous things got included at the end
        file_put_contents($file->getPathname(), $content);
    }
}
echo "Cleanup done\n";
