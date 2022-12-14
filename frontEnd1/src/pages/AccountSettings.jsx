import { Instagram, NotificationsNone } from "@mui/icons-material";
import { Box, Button, Card, Grid, styled, useTheme } from "@mui/material";
import ConnectAccounts from "components/accountSettings/ConnectAccounts";
import Experiences from "components/accountSettings/Experiences";
import Notifications from "components/accountSettings/Notifications";
import Password from "components/accountSettings/Password";
import Preferences from "components/accountSettings/Preferences";
import RecentDevices from "components/accountSettings/RecentDevices";
import Skills from "components/accountSettings/Skills";
import SocialAccounts from "components/accountSettings/SocialAccounts";
import UserInfo from "components/accountSettings/UserInfo";
import FlexBox from "components/FlexBox";
import { H3 } from "components/Typography";
import useTitle from "hooks/useTitle";
import BadgeIcon from "icons/BadgeIcon";
import DevicesIcon from "icons/DevicesIcon";
import DiamondIcon from "icons/DiamondIcon";
import PasswordIcon from "icons/PasswordIcon";
import ProfileIcon from "icons/ProfileIcon";
import SettingIcon from "icons/SettingIcon";
import ShareAccountIcon from "icons/ShareAccount";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import convertToSlug from "utils/convertSlug"; // styled component

const StyledButton = styled(Button)(() => ({
  fontSize: 12,
  borderRadius: 0,
  marginTop: "0.4rem",
  position: "relative",
  justifyContent: "flex-start"
}));

const AccountSettings = () => {
  // change navbar title
  useTitle("Account Settings");
  const theme = useTheme();
  const {
    t
  } = useTranslation();
  const [active, setActive] = useState("user-info");
  const style = {
    backgroundColor: theme.palette.mode === "light" ? theme.palette.secondary.light : theme.palette.divider,
    color: theme.palette.primary.main,
    "&::before": {
      width: 4,
      right: 0,
      content: '""',
      height: "100%",
      position: "absolute",
      backgroundColor: theme.palette.primary.main
    }
  };
  return <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Card sx={{
          padding: "1.5rem 0"
        }}>
            <H3 mb="0.5rem" pl="1.5rem">
              {t("User Profile")}
            </H3>

            <FlexBox flexDirection="column" sx={{
            [theme.breakpoints.between("sm", 960)]: {
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between"
            }
          }}>
              {tabList.map(({
              id,
              name,
              Icon
            }) => <StyledButton key={id} startIcon={<Icon sx={{
              color: "text.disabled"
            }} />} onClick={() => setActive(convertToSlug(name))} sx={active === convertToSlug(name) ? style : {
              "&:hover": style
            }}>
                  {t(name)}
                </StyledButton>)}
            </FlexBox>
          </Card>
        </Grid>

        <Grid item md={9} xs={12}>
          {active === convertToSlug(tabList[0].name) && <UserInfo />}
          {active === convertToSlug(tabList[1].name) && <Experiences />}
          {active === convertToSlug(tabList[2].name) && <Skills />}
          {active === convertToSlug(tabList[3].name) && <Password />}
          {active === convertToSlug(tabList[4].name) && <Preferences />}
          {active === convertToSlug(tabList[5].name) && <ConnectAccounts />}
          {active === convertToSlug(tabList[6].name) && <RecentDevices />}
          {active === convertToSlug(tabList[7].name) && <Notifications />}
          {active === convertToSlug(tabList[8].name) && <SocialAccounts />}
        </Grid>
      </Grid>
    </Box>;
};

const tabList = [{
  id: 1,
  name: "User Info",
  Icon: ProfileIcon
}, {
  id: 2,
  name: "Experiences",
  Icon: BadgeIcon
}, {
  id: 3,
  name: "Skills",
  Icon: DiamondIcon
}, {
  id: 4,
  name: "Password",
  Icon: PasswordIcon
}, {
  id: 5,
  name: "Preferences",
  Icon: SettingIcon
}, {
  id: 6,
  name: "Connected Accounts",
  Icon: ShareAccountIcon
}, {
  id: 7,
  name: "Recent Devices",
  Icon: DevicesIcon
}, {
  id: 8,
  name: "Notifications",
  Icon: NotificationsNone
}, {
  id: 9,
  name: "Social Accounts",
  Icon: Instagram
}];
export default AccountSettings;