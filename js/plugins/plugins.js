 // $('.dropdown-button').dropdown({
 //      inDuration: 300,
 //      outDuration: 225,
 //      constrain_width: false, // Does not change width of dropdown to that of the activator
 //      hover: true, // Activate on hover
 //      gutter: 10, // Spacing from edge
 //      belowOrigin: false, // Displays dropdown below the button
 //      alignment: 'left' // Displays dropdown with edge aligned to the left of button
 //    }
 //  );
 

 $('.modal-trigger').leanModal({
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    starting_top: '4%', // Starting top style attribute
    ending_top: '10%', // Ending top style attribute
    // ready: function() { alert('Ready'); }, // Callback for Modal open
    // complete: function() { alert('Closed'); } // Callback for Modal close
  }
);