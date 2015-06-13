
        // Wait for device API libraries to load //
        document.addEventListener("deviceready", onDeviceReady, false);
        //window.addEventListener("load", onDeviceReady, false);

        // device APIs are available//
        //----------Add_Music_Control_Function---------------//
       
        //-----Control_Array---------//
        var MusicControlList;
        var voiceNameList = ["matchcase","butterfly","watch","drawing","hopeless","box"];

        function onDeviceReady() {
            //alert("Start_Device_Ready");
            //--------Set_Audio_Source-----------//

            var voiceList = [];
            var BGMNameList = [];
            var BGMList = [];

             for(i=0; i < voiceNameList.length; i++){
                voiceList[i] =  "source/voice_" + ( i + 1 ) +".mp3";
                prepairAudio( voiceNameList[i] , voiceList[i]);

                BGMNameList[i] = voiceNameList[i] + "_BGM";
                BGMList[i] = "source/bgm_" + ( i + 1 ).toString() + ".mp3";

                prepairAudio( BGMNameList[i] , BGMList[i]);
             }
             
             //alert(BGMNameList);
             //alert(BGMList);
            
            //alert("Audio_Setting_Done");
            //--------Set_Possible_Device-------//
            MusicControlList = new Array();
            addControl();
            //-----Start_DistListener---------//
            //alert(MusicControlList.length);
            setInterval("All_Track_DistListener()",20);
            //alert("Start_Listen_To_Dist");
        }

        

        function addControl(){
        //alert("Start_Adding");

    //-----------Syntax_Adding_Control-----------//
    //MusicControlList.push(new musicControl(Name, MediaName, Major, Minor));
        MusicControlList.push(new musicControl("matchcase", matchcase_Media, matchcase_Media_BGM, 14401, 22496));
        MusicControlList.push(new musicControl("butterfly", butterfly_Media, butterfly_Media_BGM, 4771, 56973));
        MusicControlList.push(new musicControl("watch", watch_Media, watch_Media_BGM, 2451, 1224));
        MusicControlList.push(new musicControl("drawing", drawing_Media, drawing_Media_BGM, 58227, 23806));
        MusicControlList.push(new musicControl("hopeless", hopeless_Media, hopeless_Media_BGM, 31190, 37809));
        MusicControlList.push(new musicControl("box", box_Media, box_Media_BGM, 37352, 57235));

    //-----------Done_Build_Array----------------//
        //alert(MusicControlList);
        }

function All_Track_DistListener(){
    for(i=0; i < MusicControlList.length; i++){
       var CurrentControl = MusicControlList[i];
       CurrentControl.DistListener(); 
    }
}




//---------musicControl_Class_START!!!-----------//

var FetchStatus = document.getElementById('FetchStatus');
var pieceName = document.getElementById('pieceName');

function musicControl(Name, MediaName, MediaBGMName, Major, Minor){
    //alert("Constructor_Called");
     
     var deviceName, major, minor, currentVolume, BGMVolume;
     var DeviceIn, DistRead, DistStatus, voicePlayBackStatus, BGMPlayBackStatus;
     var NewFind;

     //approaching In_6 Out_of_1.5 

     //---------For_Setting_Default---------//
     this.deviceName = Name;
     this.mediaName = MediaName;
     this.mediaBGMName = MediaBGMName;
     this.major = Major;
     this.minor = Minor;
     this.currentVolume = 0;
     this.BGMVolume = 0;
     this.voicePlayBackStatus = false;
     this.BGMPlayBackStatus = false;
     this.DeviceIn = false;
     this.DistStatus = null;
     this.NewFind = "not_get_yet";

     //alert(this.mediaName);

//------------object_Inner_function---------------------//

musicControl.prototype.DistListener = function(){

//------------Have_That_Device_Come_Once?---------------//
//-----Have-----------//

if(this.DeviceIn == true){

        if(closestBeacon == 14401){
        pieceName.innerHTML="matchcase";
        //console.log("1");
        }

        else if(closestBeacon == 4771){
        pieceName.innerHTML="butterfly";
        //console.log("2");
        }
        else if(closestBeacon == 2451){
        pieceName.innerHTML="watch";
        //console.log("3");
        }

        else if(closestBeacon == 58227){
        pieceName.innerHTML="drawing";
        //console.log("4");
        }

        else if(closestBeacon == 31190){
        pieceName.innerHTML="hopeless";
        //console.log("5");
        }

        else if(closestBeacon == 37352){
        pieceName.innerHTML="box";
        //console.log("6");
        }


    if (this.major != closestBeacon){
        this.currentVolume=0;
        this.BGMVolume += 0.1*((0 - this.BGMVolume).toFixed(5));
        this.voicePlayBackStatus = false;
    }

    else{ // Is_closeBeacon

    //-------------distance_Booleans---------//

    if( this.DistRead > 0 && this.DistRead < 150){
        DistStatus = "onVoice";
        bgImgPicker(this.deviceName , 'clean');
        this.currentVolume += 0.2*((1-this.currentVolume).toFixed(5));
        this.BGMVolume += 0.2*((0.2 - this.BGMVolume).toFixed(5));
        this.voicePlayBackStatus = true;
        searchCircle.style.visibility="hidden";
        FetchStatus.innerHTML = "You Find";


    //-------------If_New_Item???---------------//

        if(this.NewFind == "not_get_yet"){

        this.NewFind = "NewFind";
        console.log("Find_New_One, Manu_Fan_will_update!!");
        
        ckecknew();

        }

    //------------------------------------------//

    }

    else if( this.DistRead > 150 && this.DistRead < 600){
        DistStatus = "approach";
        bgImgPicker(this.deviceName , 'blur');
        this.currentVolume += 0.2*((0-this.currentVolume).toFixed(5));
        this.BGMVolume += 0.2*((1 - this.BGMVolume).toFixed(5));
            if(this.currentVolume <= 0.4){
                this.voicePlayBackStatus = false;
                    OnVoiceBeacon = "null";
            }
        searchCircle.style.visibility="visible";
        FetchStatus.innerHTML = "You Are Near To";

        //BGM_Control

    }

    else if( this.DistRead > 600 || this.DistRead == -100 ){  
        DistStatus = "lost";
        this.currentVolume += 0.2*((0-this.currentVolume).toFixed(5));

        this.BGMVolume += 0.2*((0 - this.BGMVolume).toFixed(5));

            if(this.currentVolume <= 0.4){
                this.voicePlayBackStatus = false;
                    OnVoiceBeacon = "null";
            }
        searchCircle.style.visibility="visible";

        FetchStatus.innerHTML = "You Are Near To";
    }

    //-----------//

    }
}

//-----Don't_Have----//
else if(this.DeviceIn == false){
    
    this.voicePlayBackStatus = false;

    //FLAG1
    this.currentVolume += 0.2*((0-this.currentVolume).toFixed(5));
    this.BGMVolume += 0.2*((0 - this.BGMVolume).toFixed(5));
    //fade_out_the_volume
    
}

//------------SET_VOL---------------//
//console.log(this.mediaName);

//console.log("voice ", OnVoiceBeacon);

if(this.voicePlayBackStatus == true){
//console.log("play ",this.deviceName);

if(closestBeacon != OnVoiceBeacon){
this.mediaName.play({numberOfLoops:"infinite"});
OnVoiceBeacon = closestBeacon;

//console.log( 'playing!!!  ', this.deviceName);

}

this.mediaName.setVolume(this.currentVolume);

}
else if(this.voicePlayBackStatus == false){
this.mediaName.pause();
//backgroundMusic.play();
}

this.mediaBGMName.setVolume(this.BGMVolume);

}

}
//-----------!!!musicControl_Class_END!!!------------//




function bgImgPicker( item , status ){

CloseBackground.style.backgroundImage = "url('../www/images/" + item + "_bg.jpg')";

if( status == "blur" ){
CloseBackground.style.webkitFilter = "blur(8px)"; 
}
else if( status == "clean" ){
CloseBackground.style.webkitFilter = "blur(0px)";  
}


}



//----------------------------------------------------//


        // Audio player//
        var butterfly_Media = null;
        var watch_Media = null;
        var box_Media = null;

        // Play audio//
        function prepairAudio(MediaName,src) {

            if(MediaName == "matchcase"){
            matchcase_Media = new Media(src, onSuccess, onError);
            MediaInitial( matchcase_Media, "voice" );
            }

            else if(MediaName == "butterfly"){
            butterfly_Media = new Media(src, onSuccess, onError);
            MediaInitial( butterfly_Media, "voice" );
            }

            else if(MediaName == "watch"){
            watch_Media = new Media(src, onSuccess, onError);
            MediaInitial( watch_Media, "voice" );
            }

            else if(MediaName == "drawing"){
            drawing_Media = new Media(src, onSuccess, onError);
            MediaInitial( drawing_Media, "voice" );
            }

            else if(MediaName == "hopeless"){
            hopeless_Media = new Media(src, onSuccess, onError);
            MediaInitial( hopeless_Media, "voice" );
            }

            else if(MediaName == "box"){
            box_Media = new Media(src, onSuccess, onError);
            MediaInitial( box_Media, "voice" );
            }

            //------------------//
            
            if(MediaName == "matchcase_BGM"){
            matchcase_Media_BGM = new Media(src, onSuccess, onError);
            MediaInitial( matchcase_Media_BGM, "BGM" );
            }

            else if(MediaName == "butterfly_BGM"){
            butterfly_Media_BGM = new Media(src, onSuccess, onError);
            MediaInitial( butterfly_Media_BGM, "BGM" );
            }
            else if(MediaName == "watch_BGM"){
            watch_Media_BGM = new Media(src, onSuccess, onError);
            MediaInitial( watch_Media_BGM, "BGM" );
            }            

            else if(MediaName == "drawing_BGM"){
            drawing_Media_BGM = new Media(src, onSuccess, onError);
            MediaInitial( drawing_Media_BGM, "BGM" );
            }

            else if(MediaName == "hopeless_BGM"){
            hopeless_Media_BGM = new Media(src, onSuccess, onError);
            MediaInitial( hopeless_Media_BGM, "BGM" );
            }

            else if(MediaName == "box_BGM"){
            box_Media_BGM = new Media(src, onSuccess, onError);
            MediaInitial( box_Media_BGM, "BGM" );
            }

        }


        function MediaInitial(  incomingMedia, type ){

            incomingMedia.setVolume(0.0);
            if( type == "voice" ){
            incomingMedia.pause();
            }

            else if(type == "BGM" ){
            incomingMedia.play({numberOfLoops:"infinite"});
            }

        }


        // onSuccess Callback//
        function onSuccess(){console.log("prepairAudio():Audio Success");}

        // onError Callback//
        function onError(error) {alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');}

