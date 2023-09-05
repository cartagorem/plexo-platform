import {
  Button,
  Menu,
  Text,
  TextInput,
  Avatar,
  Skeleton,
  Tooltip,
  Kbd,
  ScrollArea,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";

import { Member, Project } from "lib/types";
import { useData } from "lib/hooks/useData";
import { useActions } from "lib/hooks/useActions";
import { ProjectById } from "lib/types";
import { noMemberId } from "../constant";

export const LeadPhoto = (member: Member | null) => {
  return member?.photoUrl ? (
    <Avatar src={member.photoUrl} size="sm" radius="xl" />
  ) : (
    <Avatar size="sm" radius="xl" />
  );
};

type Payload = {
  id: any;
  name: string;
};

export const LeadName = (lead: Payload | null | undefined) => {
  return lead?.id == noMemberId || lead?.name == undefined || lead.name == null
    ? "Lead"
    : lead.name;
};

type GenericLeadMenuProps = {
  children: React.ReactNode;
  onSelect?: (member: Member | null) => void;
  project?: Project | ProjectById;
  selectedLead?: Member | null;
};

export const GenericLeadProjectMenu = ({
  children,
  onSelect,
  project,
  selectedLead,
}: GenericLeadMenuProps) => {
  const { membersData, isLoadingMembers, memberData } = useData({
    memberId: project?.leadId == noMemberId ? null : project?.leadId,
  });
  const { fetchUpdateProject } = useActions();
  const memberName = memberData?.memberById.name ? memberData?.memberById.name : selectedLead?.name;

  const onUpdateProjectLead = async (leadId: string) => {
    const res = await fetchUpdateProject({
      projectId: project?.id,
      leadId: leadId,
    });

    if (res.data) {
      showNotification({
        autoClose: 5000,
        title: "Lead updated",
        message: res.data.updateProject.name,
        color: "blue",
        icon: <Check size={18} />,
      });
    }
    if (res.error) {
      showNotification({
        autoClose: 5000,
        title: "Error!",
        message: "Try again",
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  return (
    <Menu shadow="md" position="bottom-start" withinPortal>
      <Menu.Target>
        <Tooltip
          label={memberName && project?.leadId !== noMemberId ? `Lead by ${memberName}` : "Lead by"}
          position="bottom"
        >
          {children}
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <TextInput
          placeholder="Lead by..."
          variant="filled"
          rightSection={<Kbd px={8}>A</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item
          icon={<Avatar size="sm" radius="xl" />}
          onClick={() => {
            onSelect && onSelect(null);
            project && onUpdateProjectLead(noMemberId);
          }}
        >
          Unassigned
        </Menu.Item>
        <ScrollArea h={250}>
          {isLoadingMembers ? (
            <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
          ) : (
            membersData?.members.map((m: Member) => {
              return (
                <Menu.Item
                  key={m.id}
                  icon={
                    m?.photoUrl ? (
                      <Avatar src={m.photoUrl} size="sm" radius="xl" />
                    ) : (
                      <Avatar size="sm" radius="xl" />
                    )
                  }
                  onClick={() => {
                    onSelect && onSelect(m);
                    project && onUpdateProjectLead(m.id);
                  }}
                >
                  {m.name}
                </Menu.Item>
              );
            })
          )}
        </ScrollArea>
      </Menu.Dropdown>
    </Menu>
  );
};

type LeadProjectSelectorProps = {
  lead: Member | null;
  setLead: (lead: Member | null) => void;
};

export const LeadProjectSelector = ({ lead, setLead }: LeadProjectSelectorProps) => {
  return (
    <GenericLeadProjectMenu onSelect={member => setLead(member)} selectedLead={lead}>
      {typeof lead === "undefined" ? (
        <Button compact variant="light" color={"gray"}>
          {LeadPhoto(lead)}
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={LeadPhoto(lead)}>
          <Text size={"xs"}>{LeadName(lead)}</Text>
        </Button>
      )}
    </GenericLeadProjectMenu>
  );
};
