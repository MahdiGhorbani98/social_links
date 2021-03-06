import { Box, Typography, Button, TextField, Collapse} from '@material-ui/core'
import React,{useEffect,createContext, useState ,useRef} from 'react'
// import { makeStyles } from '@mui/styles';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { withStyles } from "@material-ui/core/styles";
import MenuItem from '@mui/material/MenuItem';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
import RecordComponent from './RecordComponent'
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";
import axios from 'axios';
export const RecordContext = createContext()

export default function UserAccount() {
    const [social, setSocial] = React.useState(null);
    const [record, setRecord] = React.useState([]);
    const [id, setId] = React.useState(0);
    const [getIdToEdit, setGetIdToEdit] = React.useState();
    const [Social_id_Edit, setSocial_id_Edit] = React.useState();
    const [Social_link_Edit, setSocial_link_Edit] = React.useState();
    const [Social_type_Edit, setSocial_type_Edit] = React.useState();
    const [add, setAdd] = React.useState(true);
    const [socialIcon, setSocialIcon] = React.useState('');
    const { register, handleSubmit ,formState: { errors } , reset } = useForm();
    const onSubmit = () => SubmitRecord();
    const onSubmitEdit = () => EditRecord();

    const inputRef = useRef();
    const handleChange = (event) => {
        setSocial(event.target.value);
        for (let i = 0; i < socials.length; i++) {
            const element = socials[i];
            if(element.value === event.target.value){
                setSocialIcon(element.icon)
            }
        }
    };
    // const handleChangeID = (event) => {
    //     setRecord_to_edit(event.target.value );
    // };
    const socials = [
        {
          value: '????????????????????',
          icon: <InstagramIcon style={{color:"#909eab", marginLeft:10}}/>
        },
        {
          value: '????????????',
          icon: <FacebookIcon style={{color:"#909eab",marginLeft:10}}/>

        },
        {
          value: '????????????',
          icon: <TelegramIcon style={{color:"#909eab",marginLeft:10}}/>

        },
        {
          value: '????????????',
          icon: <TwitterIcon style={{color:"#909eab",marginLeft:10}}/>

        },
        {
          value: '????????????????',
          icon: <LinkedInIcon style={{color:"#909eab",marginLeft:10}}/>

        },
        {
          value: '????????',
          icon: <LanguageIcon style={{color:"#909eab",marginLeft:10}}/>
        }
    ];


    let [collapseBool , setCollapseBool] = useState(false)
    
    // function ChangeModeToAdd(){
    //     setAdd(true)
    // }
    function ChangeModeToAdd(){
        setAdd(true)
    }
    function ChangeModeToEdit(data){
        setAdd(false)
        setCollapseBool(true)
        // inputRef.current.value ="ee"
        setSocial_id_Edit(data.social_id)
        setSocial_link_Edit(data.social_link)
        setSocial_type_Edit(data.social_type)
    }
    function ChangeCollapse(){
        setCollapseBool(!collapseBool)
    }
    function CancelBtn(){
        setCollapseBool(false);
        setSocial('')
        reset();

    }
    function CancelBtn_OnEditMode(){
        reset();
        setSocial('')
        setCollapseBool(false);
        ChangeModeToAdd()

    }

    function SubmitRecord(){
        setId(pre=>pre+1)
        // setRecord(pre => [...pre , {id:id ,social_type:social, social_typeIcon: socialIcon ,social_id:document.getElementById('id').value, social_link:document.getElementById('link').value }])
        axios.post("http://localhost:3030/socials" , {"social_id":document.getElementById('id').value, "social_link":document.getElementById('link').value,"social_type":social })
        .then(response => setRecord(pre => [...pre , response.data]) )
        setSocial('')
        reset();
    }
    function GetIdToEdit(id){
        setGetIdToEdit(id)
    }
    function EditRecord(){
        axios.put(`http://localhost:3030/socials/${getIdToEdit}` , {"social_id":document.getElementById('id').value, "social_link":document.getElementById('link').value,"social_type":social })
        // .then(response => setRecord(pre => [...pre , response.data]) )
        .then(record.forEach((item) => {
            if(item.id === getIdToEdit){
              let i = {...item.social_id = document.getElementById('id').value,...item.social_link = document.getElementById('link').value,...item.social_type = social}
            //   let i = {...item.social_id="ddd"}
              setRecord(pre=> [...pre])
            }
        }))
        setSocial('')
        reset();

        ChangeModeToAdd()
        ChangeCollapse()
        
    }
    function DeleteRecord(data){
        // setRecord(
        //     record.filter(item=> item !== data)
        // )
        axios.delete(`http://localhost:3030/socials/${data.id}`)
        .then(() => setRecord(
            record.filter(item=> item !== data)
        ))
    }
    const StyledTextField = withStyles({
        root: {
          "& label": {
            transformOrigin: "top right",
            right: 0,
            left: "auto",
            color:'#909eab',
            fontSize:15
        },
        }
    })(TextField);

    const theme = createTheme({
        palette: {
          primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
        },
    });

    useEffect(() => {
      axios.get('http://localhost:3030/socials')
      .then(data=>setRecord(data.data))  
    },[])
    
    return (
    <RecordContext.Provider value={
        {
            record : record,
            DeleteRecord :DeleteRecord,
            ChangeModeToAdd:ChangeModeToAdd,
            ChangeModeToEdit:ChangeModeToEdit,
            GetIdToEdit : GetIdToEdit
        }
    }>
        <ThemeProvider theme={theme}>
                <Box sx={{color:'#fff', marginTop:100}}>

                    <Typography style={{fontWeight:'bold', fontSize:18 , textAlign:'right', marginRight:'19%'}} >
                        ???????? ????????????
                    </Typography>

                    <Typography style={{ fontSize:12 , textAlign:'right',margin:'10px 19% 30px 0'}} >
                    <span style={{display:'none'}}>???</span>
                    <span>????????</span>
                    <span style={{color:'#909eab',margin:'0 8px', position:'relative',top:2}}>???</span>
                    <span>??????????</span>
                    <span style={{color:'#909eab',margin:'0 8px', position:'relative',top:2}}>???</span>
                    <span style={{color:'#909eab'}}>?????????????? ????????????</span>
                    </Typography>

                    <Box
                    sx={{
                        width:'62%',
                        backgroundColor: '#202a34',
                        borderRadius: 10,
                        margin: '0 auto',
                        padding:20,
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'end'
                    }}
                    >
                        <Typography style={{fontSize:12,color:'#909eab' , textAlign:'right', marginRight:5}} >
                            ?????????????? ??????????????
                        </Typography>
                        {
                            add?
                            <Button onClick={()=>ChangeCollapse()} style={{marginTop:10, color:"#ffa82e"}}
                            endIcon={<AddIcon/>}
                            >
                                ???????????? ???????? ??????????????
                            </Button>
                            :
                            <Button onClick={()=>ChangeCollapse()} style={{marginTop:10, color:"#ffa82e"}}
                            endIcon={<EditIcon/>}
                            >
                                ???????????? ???????? ??????????????
                            </Button>
                        }
                        
                        <Collapse in={collapseBool} style={{width:'100%'}}>
                            <Box
                            sx={{
                                width:'95%',
                                backgroundColor: '#333c47',
                                borderRadius: 7,
                                margin: '0 auto',
                                padding:20,
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'end',
                                marginTop:15
                            }}>
                                {
                                    add?
                                    <Typography>
                                    ???????????? ???????? ??????????????
                                    </Typography>
                                    :
                                    <Typography>
                                    ???????????? ???????? ?????????????? <span>{Social_type_Edit}</span>
                                    </Typography>
                                }
                                <form onSubmit={handleSubmit(add?onSubmit:onSubmitEdit)} style={{width:'100%'}}>

                                <Box sx={{width:'100%',display:'flex' ,flexDirection:'row', justifyContent:'space-evenly' ,marginTop:15}}>

                                    <div className="error_reactHookForm">
                                    <StyledTextField {...register("exampleRequired1", { required: true  })} helperText={add?null:"?????????? ????????: "+Social_id_Edit}   id="id" label="(ID) ???? ????" variant="standard" style={{ width:'100%', direction:'rtl'}}></StyledTextField>
                                    {errors.exampleRequired1 && <span className="error">???????????? ?????? ???????? ???????????? ??????</span>}
                                    </div>

                                    <div className="error_reactHookForm">
                                    <StyledTextField {...register("exampleRequired2", { required: true ,pattern: /^[http]/i })} helperText={add?null:"?????????? ????????: "+Social_link_Edit} id="link" label="????????" variant="standard" style={{width:'100%', direction:'rtl'}}/>
                                    {errors.exampleRequired2?.type==="required" && <span className="error">???????????? ?????? ???????? ???????????? ??????</span>}
                                    {errors.exampleRequired2?.type==="pattern" && <span className="error"> ???????? http ???????? ????????  </span>}
                                    </div>

                                    <StyledTextField required helperText={add?null:"?????????? ????????: "+Social_type_Edit} value={social} id="type" select onChange={handleChange} style={{width:'31%', direction:'rtl'}}  label="??????" variant="standard" >
                                    {socials.map((option) => (
                                    <MenuItem  dir="rtl" key={option.value} value={option.value}>
                                        <span style={{display:'flex', alignItems:'self-end'}}>{option.icon}{option.value}</span>
                                    </MenuItem>
                                    ))}
                                    </StyledTextField>

                                </Box>

                                <Box sx={{width:'100%'}}>
                                    {
                                        add?
                                        <Button type="submit"  variant="contained" style={{marginTop:25 , marginRight:15 , borderRadius:8 , background:'#ffa82e', position:'relative' , left:0 ,border:'0.5px solid #ffa82e'}}>
                                        ?????? ???????? ??????????????
                                        </Button>
                                        :
                                        <Button type="submit" variant="contained" style={{marginTop:25 , marginRight:15 , borderRadius:8 , background:'#ffa82e', position:'relative' , left:0 ,border:'0.5px solid #ffa82e'}}>
                                         <span style={{marginRight:4}}>{Social_type_Edit}</span>???????????? ???????? ??????????????   
                                        </Button>
                                    }
                                    {
                                        add?
                                        <Button  onClick={()=>CancelBtn()} variant="contained" style={{marginTop:25 , borderRadius:8 , position:'relative' , left:0 ,background:'transparent',border:'0.5px solid rgba(255, 255, 240, 0.308)', color:"#fff" }}>
                                        ????????????
                                        </Button>
                                    :
                                        <Button onClick={()=>CancelBtn_OnEditMode()} variant="contained" style={{marginTop:25 , borderRadius:8 , position:'relative' , left:0 ,background:'transparent',border:'0.5px solid rgba(255, 255, 240, 0.308)', color:"#fff" }}>
                                        ????????????
                                        </Button>
                                    }

                                </Box>
                                </form>

                            </Box>
                        </Collapse>

                        {record.map((item,index) =>(
                            <RecordComponent key={index} data={item}/>
                            ))}

                    </Box>            
                </Box>
        </ThemeProvider>                  
    </RecordContext.Provider>
    )
}


