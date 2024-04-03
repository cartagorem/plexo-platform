import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Divider,
  Group,
  MediaQuery,
  Skeleton,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LayoutSidebar, Lock } from "tabler-icons-react";

import { User } from "lib/types";
import { PasswordForm } from "./PasswordForm";
import { EditProfileForm } from "./EditProfileForm";
import { usePlexoContext } from "context/PlexoContext";

const useStyles = createStyles(theme => ({
  container: {
    [theme.fn.smallerThan("md")]: {
      width: 600,
      minWidth: 200,
    },
  },
  avatar: {
    backgroundColor: theme.colors.brand[6],
    color: theme.colors.brand[0],
  },
}));

type UserPhoto = {
  user: User | undefined;
  size: string;
};

export const UserPhoto = ({ user, size }: UserPhoto) => {
  return user?.photoUrl && user.photoUrl !== "" ? (
    <Avatar src={user.photoUrl} size={size} radius="xl" />
  ) : user?.name ? (
    <Avatar color="brand" size={size} radius="xl">
      {user?.name[0]}
    </Avatar>
  ) : (
    <Avatar color="brand" size={size} radius="xl" />
  );
};

export const ProfilePageContent = () => {
  const { setNavBarOpened, userData, isLoadingUser } = usePlexoContext();
  const [openedProfileForm, handlersProfileForm] = useDisclosure(false);
  const [openedPasswordForm, handlersPasswordForm] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <>
      <EditProfileForm
        userData={userData}
        opened={openedProfileForm}
        close={handlersProfileForm.close}
      />
      <PasswordForm opened={openedPasswordForm} close={handlersPasswordForm.close} />
      <Stack spacing={"xl"} sx={{ flex: 1 }}>
        <Group
          h={73}
          position="left"
          sx={theme => ({
            padding: theme.spacing.md,
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            borderBottom: `1px solid ${
              theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
          })}
        >
          <Group>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <ActionIcon onClick={() => setNavBarOpened(true)}>
                <LayoutSidebar size={16} />
              </ActionIcon>
            </MediaQuery>
            Profile
          </Group>
        </Group>
        <Container size="xl" miw={600} fluid className={classes.container}>
          <Stack>
            <Stack>
              <Stack spacing={"xs"}>
                <Text fz="sm" fw={500}>
                  Profile picture
                </Text>
                {isLoadingUser ? (
                  <Skeleton circle height={56} mb="xl" />
                ) : (
                  <UserPhoto user={userData} size="lg" />
                )}
              </Stack>
              <Stack spacing={"xs"}>
                <Text fz="sm" fw={500}>
                  Name
                </Text>
                {isLoadingUser ? (
                  <Skeleton width={50} height={8} />
                ) : (
                  <Text fz="sm" c="dimmed" lh={1}>
                    {userData?.name}
                  </Text>
                )}
              </Stack>
              <Stack spacing={"xs"}>
                <Text fz="sm" fw={500}>
                  Email
                </Text>
                {isLoadingUser ? (
                  <Skeleton width={50} height={8} />
                ) : (
                  <Text fz="sm" c="dimmed" lh={1}>
                    {userData?.email}
                  </Text>
                )}
              </Stack>
              <Group position="right">
                <Button compact onClick={handlersProfileForm.open}>
                  Edit profile
                </Button>
              </Group>
            </Stack>
            <Divider />
            <Group position="right">
              <Button
                compact
                variant="default"
                leftIcon={<Lock size={16} />}
                onClick={handlersPasswordForm.open}
              >
                Change password
              </Button>
            </Group>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
