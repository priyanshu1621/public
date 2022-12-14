
var dummyData = [];
var theripistData = [];
$.post({
    url : 'C:/xampp/htdocs/public/Back-end/therapist.php',

    type : 'GET',
    success : function (result) {
        
        theripistData = JSON.parse(result);
        //theripistData = result;
      console.log (result)
   
    },
    error : function () {
      console.log ('error');
    }
  });

function lastCardVisible() {
    const windowBottom = $(window).scrollTop() + $(window).height();
    const fieldsetBottom = $('.choose-psychologist .fieldset-content').offset().top + $('.choose-psychologist .fieldset-content').height();
    const lastCardTop = $('.form-radio-item:last-of-type').offset().top;

    return ((fieldsetBottom <= windowBottom) && (lastCardTop < fieldsetBottom));
}

function loadPsychologistData() {
    
    _fetch(`/psychologists?start=${window.start},step=${window.step}`)
        .then(res => res.json())
        .then(info => {
            info.data.forEach( psychologist => {
                function selectCard(e) {
                    if(e.target.checked) {
                        window.order.psychologist.id = document.querySelector(".form-radio-item input:checked + label .id").innerText;
                        window.order.psychologist.name = document.querySelector(".form-radio-item input:checked + label .name").innerText;
                        window.order.psychologist.qualification = document.querySelector(".form-radio-item input:checked + label .qualification").innerText;
                    }
                }
                
                const card = document.createElement('div');
                card.classList.add('form-radio-item');
                card.innerHTML = `
                    <input type="radio" name="choose_psychologist" id="${psychologist.id}" value="${psychologist.id}"/>
                    <label for="${psychologist.id}" >
                        <div style="display: none" class="id">${psychologist.id}</div>
                        <div class="name">${psychologist.name}</div>
                        <div class="qualification">${psychologist.qualification}</div>
                    </label>
                `;
                card.querySelector('label').style.backgroundImage = `url(${psychologist.img})`;
                card.querySelector('input').addEventListener('change', selectCard);
                document.querySelector('.form-radio-flex').appendChild(card);
            });
            window.start = info.next;
        });
}

const [PERSONAL_INFO, PSYCHOLOGIST_SELECTION, CONFIRMATION] = [0,1,2];
window.start = 0;
window.step = 24;
window.order = {
    client: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        whatsapp: "",
        birth_date: "",
        birth_month: "",
        birth_year: "",
    },
    psychologist: {
        id: "",
        name: "",
        qualification: "",
    }
};


(function($) {

    var form = $("#signup-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            email: {
                email: true,
                required: true,
            },
            phone: {
                number: true,
                required: true,
            },
            whatsapp: {
                number: true,
                required: true,
            },
            birth_month: { required: true },
            birth_date: { required: true},
            birth_year: { required: true },
            choose_psychologist: { required: true },
            tnc: { required: true }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
    });
    form.children("div").steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        stepsOrientation: "vertical",
        titleTemplate: '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
        labels: {
            previous: 'Previous',
            next: 'Next',
            finish: 'Finish',
            current: ''
        },
        onStepChanging: function(event, currentIndex, newIndex) {
            if (currentIndex === 0) {
                form.parent().parent().parent().append('<div class="footer footer-' + currentIndex + '"></div>');
            }
            if (currentIndex === 1) {
                form.parent().parent().parent().find('.footer').removeClass('footer-0').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 2) {
                form.parent().parent().parent().find('.footer').removeClass('footer-1').addClass('footer-' + currentIndex + '');
            }
            if (currentIndex === 3) {
                form.parent().parent().parent().find('.footer').removeClass('footer-2').addClass('footer-' + currentIndex + '');
            }
            // if(currentIndex === 4) {
            //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
            // }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinishing: function(event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: async function(event, currentIndex) {
            // submit form
            await _fetch('/order', { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order),

             });
           

        },
        onStepChanged: function(event, currentIndex, priorIndex) {
            if(currentIndex === CONFIRMATION) {
                document.querySelector("#client_name").innerText     = window.order.client.first_name + ' ' + window.order.client.last_name;
                document.querySelector("#client_email").innerText    = window.order.client.email;
                document.querySelector("#client_phone").innerText    = window.order.client.phone;
                document.querySelector("#client_whatsapp").innerText = window.order.client.whatsapp;
                document.querySelector("#client_dob").innerText      = window.order.client.birth_month + '/' + window.order.client.birth_date + '/' + window.order.client.birth_year;
                // document.querySelector("#therapist_id").innerText = window.order.psychologist.id;
                document.querySelector("#therapist_name").innerText = window.order.psychologist.name;
                document.querySelector("#therapist_qualification").innerText = window.order.psychologist.qualification;
            } else if(currentIndex === PSYCHOLOGIST_SELECTION) {
                const cards_list_height = document.querySelector(".form-radio-flex").getBoundingClientRect().height;
                const cards_container_height = document.querySelector(".choose-psychologist .fieldset-content").getBoundingClientRect().height;

                if(cards_list_height < cards_container_height) {
                    loadPsychologistData();
                    theripistData = null;
                }
                
            }
            return true;
        }
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });

    $.dobPicker({
        daySelector: '#birth_date',
        monthSelector: '#birth_month',
        yearSelector: '#birth_year',
        dayDefault: '',
        monthDefault: '',
        yearDefault: '',
        minimumAge: 0,
        maximumAge: 120
    });

    // Handlers
    $("#first_name").on('change', e => { window.order.client.first_name = e.target.value; });
    $("#last_name").on('change', e => { window.order.client.last_name = e.target.value; });
    $("#email").on('change', e => { window.order.client.email = e.target.value; });
    $("#phone").on('change', e => { window.order.client.phone = e.target.value; });
    $("#whatsapp").on('change', e => { window.order.client.whatsapp = e.target.value; });
    $("#birth_date").on('change', e => { window.order.client.birth_date = e.target.value; });
    $("#birth_month").on('change', e => { window.order.client.birth_month = e.target.value; });
    $("#birth_year").on('change', e => { window.order.client.birth_year = e.target.value; });

    // INITIALIZE CARDS
    $(".choose-psychologist .fieldset-content").scroll(e => {
        if(lastCardVisible() && window.start !== null) {
            loadPsychologistData();
        }
    });
    loadPsychologistData();

})(jQuery);

async function _fetch(url) {
    var route, params = {}, query_strings = [], route = url;
    if(url.includes("?")) {
        route = url.split("?")[0];
        query_strings = url.split("?")[1].split(",");
    }
    query_strings.forEach(query => {
        const [q_key, q_value] = query.split("=");
        params[q_key] = q_value;
    });
    


    var response = {};
    switch(route) {
        case "/order": 
            $.post({
                url : '/public/Back-end/database.php',
                type : 'POST',
                data:{

                    first_name: order.client.first_name,
                    last_name: order.client.last_name,
                    email: order.client.email,
                    phone: order.client.phone,
                    whatsapp: order.client.whatsapp,
                    birth_date: order.client.birth_date,
                    birth_month: order.client.birth_month,
                    birth_year: order.client.birth_year,
                    therapistId: order.psychologist.id,
                },
                success : function (result) {
                  console.log ('success');
                  alert("DATA Successfully SENT !");
                  location.reload();
                  document.location.reload();

                },
                error : function () {
                  console.log ('error');
                }
              });
              
        case "/psychologists":
            const start_index = parseInt(params["start"]);
            const end_index = start_index + parseInt(params["step"]);
            // response.data = theripistData.slice(start_index, end_index);
            response.data = theripistData;
            response.next = (end_index >= theripistData.length) ? null : (end_index);
            break;
    }

    return { json: () => response };
}