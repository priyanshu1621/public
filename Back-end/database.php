<?php
    $first_name	= $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email= $_POST['email'];
    $phone = $_POST['phone'];
    $whatsapp = $_POST['whatsapp'];

    $therapistId = $_POST['therapistId'];
    // echo $id;
    $birth_date = $_POST['birth_date'];
    $birth_month = $_POST['birth_month'];
    $birth_year = $_POST['birth_year'];
    // $dob = strftime("%F", strtotime($birth_month."-".$birth_date."-".$birth_year));




    $conn = new mysqli('localhost','root', '','uwf');
    if($conn->connect_error){
        die('connection Failed : '.$conn->connect_error);
    }else{

        // $InsertClientQry = "insert into 'client'(first_name, last_name, email, phone, whatsapp, birth_date, birth_month, birth_year) values(?, ?, ?, ?, ?, ?, ?, ?)";


        $InsertClientQry = "INSERT INTO `client`( `first_name`, `last_name`, `email`, `phone`,`whatsapp`,`birth_date`,`birth_month`,`birth_year`,`therapistId`) 
	VALUES ('$first_name','$last_name','$email','$phone','$whatsapp','$birth_date','$birth_month','$birth_year',$therapistId)";


        // $InsertClientQry->bind_param("ssssssss", $first_name, $last_name, $email, $phone, $whatsapp, $birth_date, $birth_month, $birth_year);

        // $InsertClientQry->execute();
        echo"Registration successfull...";
        
        // $InsertClientQry->close();

        if (mysqli_query($conn, $InsertClientQry)) {
            echo json_encode(array("statusCode"=>200));
           
        } 
        else {
            echo json_encode(array("statusCode"=>201));
        }
        
        $conn->close();
    }
?>