<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json');

    // Get the posted data.
    $postdata = file_get_contents("php://input");
    $details = json_decode($postdata, true);

    if(!$details["data"][0]) {
        // check date
        echo json_encode(["status" => 0, "messages" => "Please select a date time", "data" => $postdata]);
    }
    elseif(!$details["data"][1]) {
        // check state 
        echo json_encode(["status" => 0, "messages" => "Please select a valid branch", "data" => $postdata]);
    }elseif(!$details["data"][2]) {
        // check branch
        echo json_encode(["status" => 0, "messages" => "Please select a valid state", "data" => $postdata]);
    }else{
        echo json_encode(["status" => 1, "messages" => "Successfully made appointment", "data" => $details["data"]]);
    }

?>