<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="author" content="colorlib.com">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sign Up Form</title>

    <!-- Font Icon -->
    <link rel="stylesheet" href="fonts/material-icon/css/material-design-iconic-font.min.css">
    <link rel="stylesheet" href="vendor/nouislider/nouislider.min.css">

    <!-- Main css -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
     
    <div class="main">
        <div class="container">
            
            <form  action ="/public/Back-end/database.php" method="POST" id="signup-form" class="signup-form" >
                <div>
                    <h3>Personal info</h3>
                    <fieldset>
                        <h2>Personal information</h2>
                        <p class="desc">Please enter your infomation and proceed to next step so we can build your account</p>
                        <div class="fieldset-content">
                            <div class="form-row">
                                <label class="form-label">Name</label>
                                <div class="form-flex">
                                    <div class="form-group">
                                        <input type="text" name="first_name" id="first_name" />
                                        <span class="text-input">First</span>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="last_name" id="last_name" />
                                        <span class="text-input">Last</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" name="email" id="email" />
                                <span class="text-input">Example  :<span>  Jeff@gmail.com</span></span>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="form-label">Phone Number</label>
                                <input type="text" name="phone" id="phone" />
                            </div>
                            <div class="form-group">
                                <label for="phone" class="form-label">Whatsapp Number</label>
                                <input type="text" name="whatsapp" id="whatsapp" />
                            </div>
                            <div class="form-date">
                                <label for="birth_date" class="form-label">Birth Date</label>
                                <div class="form-date-group">
                                    <div class="form-date-item">
                                        <select id="birth_month" name="birth_month"></select>
                                        <span class="text-input">MM</span>
                                    </div>
                                    <div class="form-date-item">
                                        <select id="birth_date" name="birth_date"></select>
                                        <span class="text-input">DD</span>
                                    </div>
                                    <div class="form-date-item">
                                        <select id="birth_year" name="birth_year"></select>
                                        <span class="text-input">YYYY</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </fieldset>

                    <h3>Choose Your Psychologist</h3>
                    <fieldset class="choose-psychologist">
                        <h2>Psychologists</h2>
                        <p class="desc">Please select your psychologist</p>
                        <div class="fieldset-content">
                            <div class="form-radio-flex"></div>
                        </div>
                    </fieldset>

                    <h3>Final Step</h3>
                    <fieldset>
                        <h2>Confirmation</h2>
                        <p class="desc">Please confirm your details</p>
                        <div class="fieldset-content">
                          <h4>Personal Details</h4>
                          <div class="personal-details details">
                            <div class="tag">Name</div>
                            <div id="client_name">Jeff Adams</div>
                            <div class="tag">Email</div>
                            <div id="client_email">Jeff@gmail.com</div>
                            <div class="tag">Phone Number</div>
                            <div id="client_phone">1234567890</div>
                            <div class="tag">Whatsapp Number</div>
                            <div id="client_whatsapp">1234567890</div>
                            <div class="tag">Date Of Birth</div>
                            <div id="client_dob">Jan-22-1992</div>
                          </div>
                          
                          <h4>Therapist Details</h4>
                          <div class="therapist-details details">
                            <div class="therapist-name" id="therapist_name" name ="therapist_name">Dr. J.N. Tripathi</div>
                            <div class="therapist-qualification" id="therapist_qualification">M.Sc. Psychology</div>
                          </div>
                          
                          <div class="tnc">
                            <input id="tnc" type="checkbox" name="tnc" value="tnc" checked/>
                            <label for="tnc">I've read and accept the <a href="#">terms & conditions *</a></label>
                          </div>
                        </div>
                    </fieldset>
                </div>
            </form>
        </div>

    </div>

    <!-- JS -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/jquery-validation/dist/jquery.validate.min.js"></script>
    <script src="vendor/jquery-validation/dist/additional-methods.min.js"></script>
    <script src="vendor/jquery-steps/jquery.steps.min.js"></script>
    <script src="vendor/minimalist-picker/dobpicker.js"></script>
    <script src="vendor/nouislider/nouislider.min.js"></script>
    <script src="vendor/wnumb/wNumb.js"></script>
    <script src="js/main.js"></script>
</body>

</html>