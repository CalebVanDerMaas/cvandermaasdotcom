<?php
require('vendor/autoload.php');

$app_id = '1827366';
$app_key = 'ccdfa7d9212908eda9ba';
$app_secret = '4aadc5a43f8b793af316';
$app_cluster = 'us2';

$pusher = new Pusher\Pusher($app_key, $app_secret, $app_id, ['cluster' => $app_cluster]);

$channel_name = $_POST['channel_name'];
$socket_id = $_POST['socket_id'];

echo $pusher->socket_auth($channel_name, $socket_id);