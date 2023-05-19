import {
  AppBar,
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import React, { useState } from "react";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { format } from "date-fns";

const drawerWidth = 240;

function Layout({ children }) {
  const history = useHistory();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlinedIcon color="secondary" />,
      path: "/",
      id: "0",
    },
    {
      text: "Create Note",
      icon: <LibraryAddOutlinedIcon color="secondary" />,
      path: "/create",
      id: "1",
    },
  ];

  return (
    <div className="root">
      {/* app bar */}
      <AppBar
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar>
          <Typography
            sx={{
              flexGrow: 1,
            }}
          >
            Today {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>F3lOh</Typography>
          <Avatar src="/monster.png" 
          sx={{
            marginLeft: 2,
          }}
          />
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div>
          <Typography variant="h5">F3lOh Diary</Typography>
        </div>

        {/* List */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={selectedIndex === item.id || selectedIndex === 0}
              onClick={() => {
                history.push(item.path);
                handleListItemClick(item.id);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <div className="page">
        <div className="toolbar"></div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
