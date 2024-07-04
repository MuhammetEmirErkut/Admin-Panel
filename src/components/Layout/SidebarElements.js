import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';


const SidebarElements = ({ open }) => {
    const navigate = useNavigate();

    // Sidebar için liste öğeleri
    const sidebarItems = [
        { text: 'Student List', icon: <RecentActorsIcon />, path: '/main' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        { text: 'Profile', icon: <AccountBoxIcon />, path: '/profile' },
        { text: 'Profile', icon: <AccountBoxIcon />, path: '/profile' },
    ];

    return (
        <List>
            {sidebarItems.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={() => navigate(item.path)}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default SidebarElements;
