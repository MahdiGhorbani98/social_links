import React, { useState } from 'react'
import {Dialog,DialogContentText,DialogContent,Box, Typography, Button, TextField} from '@material-ui/core'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { withStyles } from "@material-ui/core/styles";
import UseRecords from '../ContextHook';

export default function RecordComponent(props) {
    const recordData = UseRecords();
    const DeleteRecord = recordData.DeleteRecord;
    let data = props.data;
    let [open,setOpen] = useState(false)

    function Delete(){
        if(document.getElementById('delete').value === "تایید")
        {
            DeleteRecord(data)
            handleClose()
        }
    }
    function EditRecords(){
        recordData.ChangeModeToEdit(data)
        recordData.GetIdToEdit(data.id)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
    setOpen(false);
    };

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

    return (
        <Box
        sx={{
            width:'95%',
            background:'#333c47',
            padding:20,
            borderRadius: 7,
            marginTop:30,
            display:'flex',
            flexDirection:'row-reverse',
            justifyContent:'space-between',
            alignItems:'center',
            marginLeft:'auto',
            marginRight:'auto',
            
        }}
        >
            <Box
            sx={{
                width:"45%",
                display:'flex',
                flexDirection:'row-reverse',
                justifyContent:'space-between',
                
            }}>
                <Typography>
                <span style={{display:'flex', alignItems:'self-end'}}>{data.social_type}{data.social_typeIcon}</span>
                </Typography>
                <Typography>
                <span style={{display:'flex', alignItems:'center' }}>{"@"+data.social_id}<span style={{fontSize:12 , color:"#909eab",marginLeft:5}}>:(ID) آی دی</span></span>
                </Typography>

                <Typography>
                <span style={{display:'flex', alignItems:'center' }}><a href={data.social_link} target="_blank" className="spanLink">{data.social_link}</a> <span style={{fontSize:12 , color:"#909eab",marginLeft:5}}>:لینک</span></span>
                </Typography>
            </Box>

            <Box>
                <Button onClick={()=>handleClickOpen()} variant="text" style={{ marginRight:10 ,color:'#f84b46'}}>
                    <span style={{marginRight:5}}>حذف</span>
                    <DeleteForeverIcon/>
                </Button>
                <Button onClick={()=>EditRecords()} variant="text" style={{color:'#ffa82e'}}>
                    <span style={{marginRight:5}}>ویرایش</span>
                    <EditIcon/>
                </Button>

            </Box>

            <Dialog open={open} onClose={handleClose} >
                <DialogContent style={{padding:20 , background:'#202a34' , borderRadius:10}}>
                <DialogContentText style={{textAlign:'right' ,color:'#fff'}}>
                    آیا از تصمیم خود مطمئن هستید؟
                </DialogContentText>
                <Typography style={{textAlign:'right',color:'#909eab', fontSize:14 , width:500,marginTop:20}}>
                <span> لطفا تایید را بنویسید <span>{"@"+data.social_id}</span> برای حذف مسیر ارتباطی</span>
                </Typography>
                <StyledTextField id="delete" placeholder="تایید" variant="standard" style={{ width:'100%', direction:'rtl', marginTop:10}}/>

                <Box sx={{background:'#202a34' , marginTop:50, display:'flex', alignItems:'end'}}>
                <Button variant="text" onClick={()=>Delete()} style={{color:'#f84b46',marginRight:5}}>حذف</Button>
                <Button variant="text" onClick={()=>handleClose()} style={{color:'#ffa82e'}}>انصراف</Button>
                </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
