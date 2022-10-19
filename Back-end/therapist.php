<?php
// CREATE CONNECTION
$conn = new mysqli('localhost','root', '','uwf');

// GET CONNECTION ERRORS
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

// SQL QUERY
$query = "SELECT * FROM `therapist`;";

// FETCHING DATA FROM DATABASE
$result = $conn->query($query);
$rows=array();
while($row = $result->fetch_assoc())
{
    $rows[]=$row;
}
echo json_encode($rows);
// print_r($rows);

	// if ($result->num_rows > 0)
	// {       
	// 	// OUTPUT DATA OF EACH ROW
	// 	while($row = $result->fetch_assoc())
	// 	{
    //         $data = array();  
    //         $data["id"]= $row[ 'id' ];  
    //         $data["TherapistName"] = $row[ 'TherapistName' ];  
    //         $data["qualification"] = $row[ 'qualification' ];  
    //         $data["img"] = $row[ 'img' ];
    //         array_push($ret, $data );

    //         //array_push($data );
	// 		// echo "id " .
	// 		// 	$row["id"]. " - TherapistName: " .
	// 		// 	$row["TherapistName"]. " | qualification: " .
	// 		// 	$row["qualification"]. "| img: " . 
    //         //     $row["img"]. "<br>";
				
	// 	}

	// }
	// else {
	// 	echo "0 results";
	// }

$conn->close();

?>
