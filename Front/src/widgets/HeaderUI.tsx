import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const HeaderUI = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: '#11508e' }} position="static">
        <Toolbar>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
             Pедактор прайс-листов предприятия. Тестовое задание.  Романов С.Г.
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderUI;