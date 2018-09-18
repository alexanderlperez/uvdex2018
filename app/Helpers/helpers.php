<?php
/**
 * helpers.php
 * @purpose Common functions for application wise usage
 * @package Hepers
 *
 */

/**
 * check current user is super admin
 * @return bool
 */
function isAdmin()
{
    if (!Auth::guest() && Auth::user()->role_id == \Config::get('constants.role.super_admin')) {
        return true;
    }
    return false;
}

/**
 * check current user is dealer
 * @return bool
 */
function isDealer()
{
    if (!Auth::guest() && Auth::user()->role_id == \Config::get('constants.role.dealer')) {
        return true;
    }
    return false;
}

/**
 * @param array $param
 */
function sendMail($param = array())
{

    $defaultArgs = array(
        'toEmail' => '',
        'toName' => '',
        'templateData' => array(
            'text' => 'Hi From '.\Config::get('constants.site.name')
        ),
        'template' => 'general',
        'subject' => '',

    );

    $param = array_merge($defaultArgs, $param);

    $to = $param['toEmail'];
    $toName = $param['toName'];
    $template = 'emails.' . $param['template'];
    $subject = $param['subject'];
    \Mail::send($template, $param['templateData'], function ($mail)
    use ($to, $toName, $subject) {
        $mail->subject($subject);
        $mail->to($to, $toName);

    });
}

/**
 * set message in session
 * @param  string $type message type (alert-danger,alert-success,alert-notice)
 * @param  string $message message
 */
function setFlashMessage($type = 'success', $message = '')
{
    $messages = array($type => $message);
    Session::put('flash_message', $messages);
}

/**
 * show sesion message and remove it
 * @return string     session message html
 */
function showFlashMessage()
{

    $output = '';
    if (Session::has('flash_message')) {
        $output .= '<div class="flash-message">';
        $messages = Session::get('flash_message');
        Session::forget('flash_message');
        if (is_array($messages)) {
            foreach ($messages as $type => $message) {
                $output .= '<div class="alert alert-' . $type . ' col-lg-12 col-md-12 col-sm-12 col-xs-12">';
                $output .= '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                $output .= $message;

                $output .= '</div>';
            }
        } else {
            $output .= '<div class="alert  col-lg-12 col-md-12 col-sm-12 col-xs-12">';
            $output .= '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            $output .= $messages;
            $output .= '</div>';
        }
        $output .= '</div>';

    }
    return $output;

}

/**
 * format date
 * @param $date
 * @param string $format
 * @return false|string
 */
function getFormattedDate($date, $format = 'm/d/Y')
{
    return \Carbon\Carbon::parse($date)->format($format);
}

/**
 * Get dashboard url
 * @return \Illuminate\Contracts\Routing\UrlGenerator|string
 */
function getDashboardUrl()
{

    $url = url('login');
    if (!\Auth::guest()) {
        $role = Auth::user()->role_id;
        switch ($role) {
            case \Config::get('constants.role.super_admin'):
                $url = url('admin');
                break;
            case \Config::get('constants.role.dealer'):
                $url = url('used-vehicles');
                break;
            default:
                $url = url('login');
        }
    }
    return $url;

}

/**
 * Save File
 * @param $request
 * @param $fieldName
 * @param $filePrefix
 * @param $folder
 * @return string
 */
function saveFile($request, $fieldName, $filePrefix, $folder) {

    $image = $request->file($fieldName);
    $imageName = $filePrefix.time().'.'.$image->getClientOriginalExtension();
    \Illuminate\Support\Facades\Storage::disk($folder)->putFileAs(null, $image, $imageName);

    return $imageName;
}

/**
 * Delete Existing File
 * @param $folder
 * @param $currentImage
 */
function deleteFile($folder, $currentImage) {
    if(\Illuminate\Support\Facades\Storage::disk($folder)->exists($currentImage))
        \Illuminate\Support\Facades\Storage::disk($folder)->delete($currentImage);
}

/**
 * Get Status
 * @param $value
 * @return mixed
 */
function getStatus($value) {

    $data['is_active'] = Config::get('constants.status.active'); //Default active

    if ($value == Config::get('constants.string.active'))
        $data['is_active'] = Config::get('constants.status.inactive');// InActive state
    elseif ($value == Config::get('constants.string.inactive'))
        $data['is_active'] = Config::get('constants.status.active');// Active state

    return $data;
}

/**
 * Get user role text
 * @param int $value
 * @param boolean $prefix to prefix the role text with 'a' or 'an'
 * @return mixed|string
 */
function getRole($value = 0, $prefix = false)
{
    $dataArray = array_flip(Config::get('constants.role'));
    $role = isset($dataArray[$value]) ? $dataArray[$value] : '';

    if ($role != '' && $prefix) {
        if ('a' == strtolower($role[0])) {
            $role = 'an ' . $role;
        } else {
            $role = 'a ' . $role;
        }
    }
    return $role;
}

/**
 * Filter Null Values
 * @param $data
 * @return mixed
 */
function filterNullValues($data){

    foreach($data as $key => $value) {

        if(is_null($value))
            $data[$key] = '';

        if( ($key == 'price' || $key == 'nada' || $key == 'msrp') && $value == '')
            $data[$key] = 0;
    }
    return $data;
}

/**
 * Get User Id
 * @return mixed
 */
function getUserId() {

    if(\Illuminate\Support\Facades\Auth::user()->parent_id)
        return \Illuminate\Support\Facades\Auth::user()->parent_id;
    else
        return \Illuminate\Support\Facades\Auth::user()->id;
}

/**
 * check IE Browser
 * @return bool
 */
function browserIE() {

    dd($_SERVER['HTTP_USER_AGENT']);

    $response = false;
    if(isset($_SERVER['HTTP_USER_AGENT']) && strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false)
        $response = true;

    return $response;
}