
import { AppBar, Toolbar, Typography, styled, Box, InputBase, Badge, Avatar } from "@mui/material"
import { Mail, Notifications, Pets } from "@mui/icons-material"
import { deepPurple } from "@mui/material/colors"

function Navbar() {
  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
  })

  const Search = styled("div")(({theme}) => ({
    backgroundColor: "white",
    padding: "0.3rem 10px",
    borderRadius: theme.shape.borderRadius,
    width:"30%"
  }))

  const Icons = styled(Box)(({theme}) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]:{
      display: "flex",
    }
  }))

  const UserBox = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]:{
      display: "none",
    }
  }))
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography 
          variant="h5"
          sx={{display: {xs: "none", sm: "block"}}}
        >FundMe</Typography>
        <Pets sx={{display: {xs: "block", sm: "none"}}}/>
        <Search>
          <InputBase placeholder="Search..."/>
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar sx={{bgcolor: deepPurple[500], width:40, height:40}}>W</Avatar>
        </Icons>
        <UserBox>
          <Avatar sx={{bgcolor: deepPurple[500]}}>W</Avatar>
          <Typography>Wung</Typography>
        </UserBox>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar