//*************My_Functions**********//


var HeadphoneStatus = false;

 function NoHeadPhone(){

  //console.log("hi");

  if(HeadphoneStatus == false){

  headphoneOut.style.backgroundPositionX="180%";
  headphoneIn.style.backgroundPositionX="180%";
  cellphoneOut.style.backgroundPositionX="50%";
  cellphoneIn.style.backgroundPositionX="50%";
  
  PhoneText.innerHTML = "Bring Your Phone Close To Ear";
  NoSign.innerHTML = "I have headphones";
  }
  else if(HeadphoneStatus == true){

  headphoneOut.style.backgroundPositionX="50%";
  headphoneIn.style.backgroundPositionX="50%";
  cellphoneOut.style.backgroundPositionX="-180%";
  cellphoneIn.style.backgroundPositionX="-180%";
  
  PhoneText.innerHTML = "Use Your Headphones";
  NoSign.innerHTML = "I don't have headphones";
  }

  HeadphoneStatus = !HeadphoneStatus;

  //console.log(HeadphoneStatus);

 }

