<?php

require '../../db/mimis.php';

$err = [
  'status' => 'error',
  'msg' => 'incorrect data object',
  'origin' => $_SERVER['HTTP_ORIGIN']
];

if( !in_array($_SERVER['HTTP_ORIGIN'],$validOrigins) ){
  $response = $err;
  $response['msg'] = 'invalid origin';
} else {
    
    if(isset($_POST['statement'])){
      $statement = $_POST['statement'];
    } else if(isset($_REQUEST['statement'])){
      $statement = $_REQUEST['statement'];
    }

    if(isset($_POST['results_mail'])){
      $results_mail = $_POST['results_mail'];
    } else if(isset($_REQUEST['results_mail'])){
      $results_mail = $_REQUEST['results_mail'];
    }

    if(isset($_POST['copy'])){
      $copy = $_POST['copy'];
    } else if(isset($_REQUEST['copy'])){
      $copy = $_REQUEST['copy'];
    }

    if( $statement !== null 
     && $results_mail !== null 
     && $copy !== null
    ){
        
        $base64 = base64_encode(json_encode($statement));

        $to = 'results@morpheustraining.co.uk';
        
        if ($copy === 'true'){
          $email = str_replace('mailto:','',$statement['actor']['mbox']);
        }
        
        $subject = $statement['object']['definition']['en-US'].' results for '.ucfirst($statement['actor']['name']);
        
        $message = "
        <!DOCTYPE html>
        <html>
          <head>
            <title>$subject</title>
            <meta name='viewport' content='width=device-width'/>
            <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
            <style>
                body{margin:0; padding:0; font-family:Arial,sans-serif;}
                h1,h2{margin: 10px;}
                .results{
                    margin: 10px;
                    border: solid 1px #ccc;
                    border-radius: 4px;
                    padding: 10px 0px;
                }
                .results > * {margin:10px}
                .resultMessage{
                  font-size: 2em;
                  text-align: center;
                }
                .score{
                    margin: 10px 0px;
                    font-weight: bold;
                }
                .category[data-title='Auditory'], .auditory{ background-color: #b0d8b0; }
                .category[data-title='Visual'], .visual{ background-color: #ffabab; }
                .category[data-title='Kinaesthetic'], .kinaesthetic { background-color: #f3b47f; }
                .category {
                    padding: 20px;
                    border-radius: 4px;
                }
            </style>
          </head>
          <body>
            <h2>$subject</h2>
            $results_mail
            <div class='resultObj' style='display:none; width:0; height:0;'>
              $base64
            </div>
          </body>
        </html>
        ";

        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        // More headers
        $headers .= 'From: no-reply@morpheustraining.co.uk' . "\r\n";
        if($copy === 'true'){
            $headers .= "Cc: $email" . "\r\n";
        }
        
        mail($to,$subject,$message,$headers,"-f no-reply@morpheustraining.co.uk");
        
        $response = [
          'status' => 'success',
          'origin' => $_SERVER['HTTP_ORIGIN'],
          'headers' => $headers,
          'copy' => $copy
        ];

    } else {
        $response = $err;
    }

}

echo json_encode($response);