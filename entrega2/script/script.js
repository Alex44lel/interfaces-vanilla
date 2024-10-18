
$(document).ready(function(){

    let logged_user = "ana"
    let logged_user_email = "ana@gmail.com"

    // let logged_user = null
    // let logged_user_email = null


    //-------------------------MENU HAMHURGUER------------------------------------
    const hamburguerCloseButton =$( ".close-hamburguer")
    const hamburguerMenuButton =$( "#hamburger-menu-button" )
    const hamburguerMenu = $( ".menu-hamburguer" )

    function hideHamburguerMenu(){
      hamburguerCloseButton.hide();
      hamburguerMenu.hide();
      hamburguerMenuButton.show()
    }

    function openHamburguerMenu(){
      hamburguerCloseButton.show();
      hamburguerMenu.show();
      hamburguerMenuButton.hide()
    }
    
    hideHamburguerMenu()

    hamburguerMenuButton.click(function() {
    hamburguerMenu.slideToggle( "slow", function() {
    hamburguerMenuButton.hide();
    hamburguerCloseButton.show();
    });
    });

    hamburguerCloseButton.click(function() {
    hamburguerMenu.slideToggle( "slow", function() {
    hamburguerCloseButton.hide();
    hamburguerMenuButton.show();
    });
    });

    //-------------------------CLOCK------------------------------------

    //getTime lo retorna en milliseconds
    const target = new Date("December 24, 2024 00:00:00").getTime();

    function actualizarContador(){
        let now = new Date().getTime()
        let diff = target - now
        if (diff < 0) {
            clearInterval(contadorInterval)
            $(".home-contador").text("Llega papá noél")
            return
        }

        //calculo cuantos dias,segundos, horas ... quedan
        let dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        let horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((diff % (1000 * 60)) / 1000);
        
        $(".home-contador").text(`${dias} días ${horas}h ${minutos}m ${segundos}s`)

       
    }

    let contadorInterval = setInterval(actualizarContador,1000)



    //-------------------------MODAL SIGN UP------------------------------------
    

    const modal = $('#register-modal');
    const closeButton = $('.close');
    const registerButton = $('#sign-up');
    const registerButtonPhone = $('#sign-up-phone');

    registerButton.on('click', function() {
        modal.show();
      });

    registerButtonPhone.on('click', function() {
      modal.show();
      hideHamburguerMenu()
      
    });
    
    closeButton.on('click', function() {
        modal.hide();
    });

    $('#children').change('input', function() {
        const numberOfChildren = $('#children').val()
        const childrenInfo = $('#children-info');
        // limpia lo que hay dentro del div
        childrenInfo.empty();
        for (let i = 0; i < numberOfChildren; i++) {
          childrenInfo.append(`
              <h4>Hijo ${i+1}</h4>
              <label for="modal-child-name-${i}">Nombre del hij@ ${i + 1}</label>
              <input type="text" id="modal-child-name-${i}" minlength="2" required>
              <label for="modal-child-age-${i}">Edad hij@ ${i + 1}</label>
              <input type="number" id="modal-child-age-${i}" min="0" required>
              <label for="modal-child-games-${i}">Juguetes fav hij@ ${i + 1}</label>
              <input type="text" id="modal-child-games-${i}"  required>
            
          `);
        }
      });

      $('#modal-register-form').on('submit', function(e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirm-password').val();
        const email = $('#email').val();
        const city = $('#city').val();
        const country = $('#country').val();
        const gender = $('#gender').val();
        const number_children = $('#children').val();

        // Password validation (use chatgpt for regrex)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!passwordRegex.test(password)) {
          showCustomPopup("Error",'Necesitas como mínimo 2 números, 1 carácter especial, 1 letra mayúscula 1 letra minúscula y 12 caracteres.', { confirm: false });
          return;
        }
        if (!emailRegex.test(email)){
          showCustomPopup("Error",'El correo no está bien', { confirm: false });
          return
        }
        if (password !== confirmPassword) {
          showCustomPopup("Error",'No coinciden las contraseñas', { confirm: false });
          return;
        }
        
        const user = {
            username,
            email,
            password,
            city,
            country,
            gender,
            number_children,
            children_data : [],
            cartas:[],

        }
        for (let i = 0; i < user.number_children; i++) {
            user.children_data.push({
              name: $(`#modal-child-name-${i}`).val(),
              age: $(`#modal-child-age-${i}`).val(),
              games: $(`#modal-child-games-${i}`).val()
            });
        }

        let users = JSON.parse(localStorage.getItem('users')) || {}; 
        users[user.email] = user

        localStorage.setItem('users', JSON.stringify(users));

        showCustomPopup("Enhorabuena",'Has sido registrado')
        $('#children-info').empty();
        $('#modal-register-form').trigger('reset');

        modal.hide();

      })

      $('#cancel-button').on('click', function() {
        showCustomPopup("Aviso",'¿Seguro que quieres cancelar?',{confirm:true,confirmAction:()=>modal.hide()})
          
      });

      $('#clear-button').on('click', function() {

        showCustomPopup("Aviso",'¿Quieres resetear todos los campos?',{confirm:true,confirmAction:()=>{
          $('#children-info').empty();
          $('#modal-register-form').trigger('reset')
        }})

      
      });


    //-------------------------MODAL SIGN IN------------------------------------


    const modal_sign_in= $('#sign-in-modal');
    const closeButton_sign_in= $('#close-sign-in');
    const cancelButton_sign_in= $('#cancel-sign-in-button');
    const signInButton= $('#sign-in');
    const signInButtonPhone= $('#sign-in-phone');
    

    let signLogDiv = $(".sign-log") 
   

    let userIconDiv = $(".user-icon") 
 
    userIconDiv.hide()

    cancelButton_sign_in.on('click', function() {
      showCustomPopup("Aviso",'¿Seguro que quieres cancelar?',{confirm:true,confirmAction:()=>modal_sign_in.hide()})
        
      });

    signInButton.on('click', function() {
      modal_sign_in.show();
    });

    signInButtonPhone.on('click', function() {
      modal_sign_in.show();
      hideHamburguerMenu()
    });
    
    closeButton_sign_in.on('click', function() {
        modal_sign_in.hide();
    });

    $('#modal-sign-in-form').on('submit', function(e) {
        e.preventDefault()
        const username = $('#modal-sign-in-form #username').val();
        const password = $('#modal-sign-in-form #password').val(); 

        let current_users = JSON.parse(localStorage.getItem('users')) || []
        current_users = Object.entries(current_users)

        for (let i = 0; i < current_users.length; i++) {

            const user = current_users[i][1];
            console.log(user)
            if (user.username == username && password == user.password){
                //sign in
                showCustomPopup("Enhorabuena","Log in exitoso")

                logged_user = username
                logged_user_email = user.email
                userIconDiv.show()
                signLogDiv.hide()
                modal_sign_in.hide()
                return
            }

            
                
            
        }
        console.log("return")
        showCustomPopup("Error","Usuario o contraseña incorrectos")
        
        
    })




    //assign based on phone size
    let userDropdown = $(".user-dropdown") 
      
    let userIconImage =  $(".user-icon img");

    

    

    let logOutText = $(".user-dropdown ul li:nth-child(3)");
    //-------------------------USER DROPDOWN--------------------------------
    userIconImage.on("click", function (e) {
      //necesitamos parar la propagación del evento porque tenemos otro listener para cerrarlo
        e.stopPropagation(); 
        userDropdown.toggle();
    });

    $(document).on("click", function () {
        userDropdown.hide();
    });

    
    userDropdown.on("click", function (e) {
       //same reason, to avoid hidding it
        e.stopPropagation();
    });

    // Cerrar sesión logic
    logOutText.on("click", function () {
        
        showCustomPopup("Warnign","Seguro que quieres cerrar sesión?",{confirm:true, confirmAction :()=>{
          userIconDiv.hide();
          signLogDiv.show();
          userDropdown.hide();
          logged_user = null
          logged_user_email = null
        }})
        
        
    });


    //-------------------------CUSTOM POP UP--------------------------------
    function showCustomPopup(title, message, configuration = { confirm: false }) {
      console.log("configuration")
      // Ponemos el titulo y el mensaje
      $('#custom-popup-title').text(title);
      $('#custom-popup-message').text(message);
    
      // Enseñamos o no el boton de 
      if (configuration.confirm) {
        $('#custom-popup-buttons').show();
      } else {
        $('#popup-cancel-button').hide();
      }
    
      //aparece el popup con fadein
      $('#custom-popup').fadeIn();

      $('#popup-confirm-button').on('click', function () {
        if (configuration.confirmAction) {
          //la acción tras confirmar
          configuration.confirmAction(); 
        }
        $('#custom-popup').fadeOut();
  
      });

      $('#popup-cancel-button').on('click',()=>{$('#custom-popup').fadeOut();})
    }
    
   
    //----------------------------FORM CARTA-----------------------------------
    $('#form-carta').on('submit', function(e) {
      e.preventDefault();
      if (logged_user == null){
        showCustomPopup("Error",'Necesitas registrate')
        return 
      }
      const name = $('#name-carta').val();
      const email = $('#correo-carta').val();
      const city = $('#city-carta').val();
      const country = $('#country-carta').val();
      const textCarta = $('#text-carta').val();
      console.log(textCarta)
      
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let users = JSON.parse(localStorage.getItem('users')) || {}; 
      users_keys = Object.keys(users)
      console.log(email)
      if (!emailRegex.test(email)){
        showCustomPopup("Error",'El correo no está bien', { confirm: false });
        return
      }

      let isEmailValid = false
      for (let i = 0; i < users_keys.length; i++){
        if (email == users_keys[i]){
          isEmailValid = true
          break
        }
      }

      if (email != logged_user_email || !isEmailValid){
        isEmailValid = false
        showCustomPopup("Error",'El correo no es el del usurario registrado')
        return
      }

      
      const carta = {
          name,
          email,
          city,
          country,
          textCarta,
      }
      
      console.log(users[email])
      console.log(users[email]["cartas"])
      users[email]["cartas"].push(carta)
      localStorage.setItem('users', JSON.stringify(users));

      showCustomPopup("Enhorabuena",'Carta guardada correctamente')
      $('#form-carta').trigger('reset');

    })

    //--------------------CARTAS MODAL-------------------------------
    const misCartasButton = $(".user-dropdown ul li:nth-child(2)");
    const misCartasModal = $('#mis-cartas-modal');
    const closeMisCartasButton = $('#close-mis-cartas-modal');

    misCartasButton.on('click', function() {
      mostrarCartas();
      misCartasModal.show();
    });

    closeMisCartasButton.on('click', function() {
      misCartasModal.hide();
    });

    function mostrarCartas() {
      let users = JSON.parse(localStorage.getItem('users')) || {};
      console.log(users)
      console.log(logged_user_email)
      let cartasList = users[logged_user_email].cartas || [];

      console.log(cartasList)
    
      const cartasContainer = $("#cartas-list");
      cartasContainer.empty(); // Limpiar cartas anteriores
    
      if (cartasList.length === 0) {
        cartasContainer.append("<p>No has enviado ninguna carta.</p>");
      } else {
        cartasList.forEach((carta, index) => {
          cartasContainer.append(`
            <div class="carta-container" data-index="${index}" draggable="true">
              <h4 class="carta-title-user">Carta ${index + 1}</h4>
              <p><strong>Nombre:</strong> ${carta.name}</p>
              <p><strong>Ciudad:</strong> ${carta.city}</p>
              <p><strong>País:</strong> ${carta.country}</p>
              <p><strong>Carta:</strong> ${carta.textCarta}</p>
              <button class="delete-carta-button" data-index="${index}">Borrar</button>
            </div>
          `);
        });
      }
      // Habilitar la eliminación de cartas
      $('.delete-carta-button').on('click', function() {
        const cartaIndex = $(this).data('index');
        confirmarEliminarCarta(cartaIndex);
      });
    
      // Llamada para habilitar drag-and-drop
      //habilitarDragAndDrop();
    }

    function confirmarEliminarCarta(index) {
      showCustomPopup("Confirmar", "¿Estás seguro de que quieres eliminar la carta?", {
        confirm: true,
        confirmAction: function() {
          eliminarCarta(index);
        }
      });
    }
    
    function eliminarCarta(index) {
      let users = JSON.parse(localStorage.getItem('users')) || {};
      let cartas = users[logged_user_email].cartas;
    
      cartas.splice(index, 1); // Elimina la carta del array
    
      // Guardar los cambios
      users[logged_user_email].cartas = cartas;
      localStorage.setItem('users', JSON.stringify(users));
    
      // Actualizar la lista de cartas
      mostrarCartas();
    }
    
    

    
    //showCustomPopup("Estas seguro?","There is not a place in the world",{ confirm: true, confirmAction: () => console.log("Hola") })
    //showCustomPopup('Alert', message, { buttons: false });




    //CONFIGURATION
    userIconDiv.show()
    signLogDiv.hide()
    
})

//TODO: TRANSFORMAR ALERTAS EN MODALES