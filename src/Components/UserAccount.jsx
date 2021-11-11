import { Box, Typography, Button, TextField, Collapse} from '@material-ui/core'
import React,{createContext, useState} from 'react'
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

export const RecordContext = createContext()

export default function UserAccount() {
    const [record, setRecord] = React.useState([]);
    const [social, setSocial] = React.useState('');
    const [socialIcon, setSocialIcon] = React.useState('');
    const handleChange = (event) => {
        setSocial(event.target.value);
        for (let i = 0; i < socials.length; i++) {
            const element = socials[i];
            if(element.value === event.target.value){
                setSocialIcon(element.icon)
            }
        }
    };
    const socials = [
        {
          value: 'اینستاگرام',
          icon: <InstagramIcon style={{color:"#909eab", marginLeft:10}}/>
        },
        {
          value: 'فیسبوک',
          icon: <FacebookIcon style={{color:"#909eab",marginLeft:10}}/>

        },
        {
          value: 'تلگرام',
          icon: <TelegramIcon style={{color:"#909eab",marginLeft:10}}/>

        },
        {
          value: 'توییتر',
          icon: <TwitterIcon style={{color:"#909eab",marginLeft:10}}/>

        },
        {
          value: 'لینکداین',
          icon: <LinkedInIcon style={{color:"#909eab",marginLeft:10}}/>

        },
        {
          value: 'سایت',
          icon: <LanguageIcon style={{color:"#909eab",marginLeft:10}}/>
        }
    ];


    let [collapseBool , setCollapseBool] = useState(false)
    function ChangeCollapse(){
        setCollapseBool(!collapseBool)
    }
    function CancelBtn(){
        setCollapseBool(false);
        setSocial('')
    }
    function SubmitRecord(){
        // console.log(record.);
        let id = 1;
        setRecord(pre => [...pre , {social_type:social, social_typeIcon: socialIcon ,social_id:document.getElementById('id').value, social_link:document.getElementById('link').value }])
        setSocial('')
    }
    function DeleteRecord(_item){
        setRecord(
            record.filter(item=> item !== _item)
        )
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
    
    return (
    <RecordContext.Provider value={
        {
            record : record,
            DeleteRecord :DeleteRecord
        }
    }>
        <ThemeProvider theme={theme}>
                <Box sx={{color:'#fff', marginTop:100}}>

                    <Typography style={{fontWeight:'bold', fontSize:18 , textAlign:'right', marginRight:'19%'}} >
                        حساب کاربری
                    </Typography>

                    <Typography style={{ fontSize:12 , textAlign:'right',margin:'10px 19% 30px 0'}} >
                    <span style={{display:'none'}}>•</span>
                    <span>خانه</span>
                    <span style={{color:'#909eab',margin:'0 8px', position:'relative',top:2}}>•</span>
                    <span>کاربر</span>
                    <span style={{color:'#909eab',margin:'0 8px', position:'relative',top:2}}>•</span>
                    <span style={{color:'#909eab'}}>تنظیمات کاربری</span>
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
                            مسیرهای ارتباطی
                        </Typography>
                        <Button onClick={()=>ChangeCollapse()} style={{marginTop:10, color:"#ffa82e"}}
                        endIcon={<AddIcon/>}
                        >
                            افزودن مسیر ارتباطی
                        </Button>
                        
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
                                <Typography>
                                افزودن مسیر ارتباطی
                                </Typography>
                                <Box sx={{width:'100%',display:'flex' ,flexDirection:'row', justifyContent:'space-evenly' ,marginTop:15}}>

                                    <StyledTextField id="id" label="(ID) آی دی" variant="standard" style={{ width:'31%', direction:'rtl'}}/>
                                    <StyledTextField id="link" label="لینک" variant="standard" style={{width:'31%', direction:'rtl'}}/>
                                    <StyledTextField id="type" select value={social} onChange={handleChange} style={{width:'31%', direction:'rtl'}}  label="نوع*" variant="standard" >
                                    {socials.map((option) => (
                                        <MenuItem  dir="rtl" key={option.value} value={option.value}>
                                        <span style={{display:'flex', alignItems:'self-end'}}>{option.icon}{option.value}</span>
                                    </MenuItem>
                                    ))}
                                    </StyledTextField>

                                </Box>

                                <Box sx={{width:'100%'}}>
                                    <Button onClick={()=>SubmitRecord()} variant="contained" style={{marginTop:25 , marginRight:15 , borderRadius:8 , background:'#ffa82e', position:'relative' , left:0 ,border:'0.5px solid #ffa82e'}}>
                                        ثبت مسیر ارتباطی
                                    </Button>
                                    <Button onClick={()=>CancelBtn()} variant="contained" style={{marginTop:25 , borderRadius:8 , position:'relative' , left:0 ,background:'transparent',border:'0.5px solid rgba(255, 255, 240, 0.308)', color:"#fff" }}>
                                        انصراف
                                    </Button>
                                </Box>

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

