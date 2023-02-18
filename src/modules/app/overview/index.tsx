import {
  AppShell,
  Group,
  Text,
  Title,
  useMantineTheme,
  Container,
  SegmentedControl,
  Box,
  Center,
  Button,
  Menu,
  TextInput,
  Modal,
  Textarea,
  Switch,
  Skeleton,
  SimpleGrid,
  ScrollArea,
  Stack,
  createStyles,
  Burger,
  Drawer,
  MediaQuery,
  Kbd,
  Avatar,
  Checkbox,
  Divider,
  Flex,
} from "@mantine/core";
import { useClickOutside } from '@mantine/hooks';
import { ReactNode, useEffect, useState } from "react";
import {
  AntennaBars1,
  AntennaBars2,
  AntennaBars3,
  AntennaBars4,
  AntennaBars5,
  Archive,
  BoxModel,
  BoxMultiple,
  ChartPie2,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotted,
  CircleHalf,
  CircleX,
  Dna,
  LayoutColumns,
  LayoutGrid,
  LayoutRows,
  MoodNeutral,
  Plus,
  Tag,
  UserCheck,
  UserCircle,
  X
} from "tabler-icons-react";
import { useQuery, useSubscription } from "urql";

import { TaskPriority, TasksDocument, TaskStatus } from "../../../integration/graphql";
import { NavbarSearch } from "components/ui/NavBarWithSearch";
import { TaskListElement } from "components/ui/Task";
import { PriorityIcon, priorityName, PrioritySelector } from "components/ui/Task/priority";
import { StatusIcon, StatusSelector, statusName} from "components/ui/Task/status";
import { getCookie, setCookie } from "cookies-next";
import { DndTaskListElement } from "components/ui/CardTask";
import { AssigneeName, AssigneePhoto, AssigneeSelector } from "components/ui/Task/assignee";
import { ProjectIcon, ProjectName, ProjectSelector } from "components/ui/Task/project";
import { TeamSelector } from "components/ui/Task/team";
import { LabelColor, LabelName, LabelSelector } from "components/ui/Task/label";
import { LabelType } from "components/ui/Task/types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useListState } from "@mantine/hooks";
import { useData } from "lib/useData";
import { Member, Project } from "../datatypes";

const useStyles = createStyles(theme => ({
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
    [theme.fn.smallerThan("xs")]: {
      marginRight: -10,
    },
  },
  drawer: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  "text-view-buttons": {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  "text-header-buttons": {
    [theme.fn.smallerThan("sm")]: {
      fontSize: "90%",
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: "70%",
      marginRight: -15,
      marginLeft: -5,
    },
  },
  "icon-header-buttons": {
    [theme.fn.smallerThan("sm")]: {
      width: "90%",
      height: "90%",
    },
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  "icon-view-buttons": {
    [theme.fn.smallerThan("sm")]: {
      width: "90%",
      height: "90%",
    },
    [theme.fn.smallerThan("xs")]: {
      width: "70%",
      height: "70%",
    },
  },
  "segmented-control": {
    [theme.fn.smallerThan("xs")]: {
      marginLeft: -5,
    },
  },
}));

const DndTaskBoard = ({ statusData }: { statusData: any }) => {
  const [state, handlers] = useListState([...statusData]);
  const [task, setTasks] = useState<{ id: string }[]>([]);

  useEffect(() => {
    setTasks(state);
  }, [state]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
        setTasks(state);
      }}
    >
      <Droppable droppableId="task-list" direction="vertical">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {state.map((t: any, index: number) => (
              <Draggable key={t.id} draggableId={t.id} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const InProgressDndTaskBoard = ({ data }: { data: any }) => {
  const inProgressData = data?.tasks.filter((t: { status: string }) => t.status == "IN_PROGRESS");

  return <DndTaskBoard statusData={inProgressData} />;
};

const ToDoDndTaskBoard = ({ data }: { data: any }) => {
  const toDoData = data?.tasks.filter((t: { status: string }) => t.status == "TO_DO");

  return <DndTaskBoard statusData={toDoData} />;
};

const BacklogDndTaskBoard = ({ data }: { data: any }) => {
  const backlogData = data?.tasks.filter((t: { status: string }) => t.status == "BACKLOG");

  return <DndTaskBoard statusData={backlogData} />;
};

const DoneDndTaskBoard = ({ data }: { data: any }) => {
  const doneData = data?.tasks.filter((t: { status: string }) => t.status == "DONE");

  return <DndTaskBoard statusData={doneData} />;
};

const NoneDndTaskBoard = ({ data }: { data: any }) => {
  const noneData = data?.tasks.filter((t: { status: string }) => t.status == "NONE");

  return <DndTaskBoard statusData={noneData} />;
};

const CancelDndTaskBoard = ({ data }: { data: any }) => {
  const cancelData = data?.tasks.filter((t: { status: string }) => t.status == "CANCELED");

  return <DndTaskBoard statusData={cancelData} />;
};

const OverviewContentBoard = (props: { data: any; fetching: any }) => {
  const theme = useMantineTheme();
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const { data, fetching } = props;

  // console.log(data.tasks);
  // console.log(typeof data.tasks);

  return (
    <ScrollArea
      type="auto"
      offsetScrollbars
      style={{ height: innerHeight - 90 }}
      onScrollPositionChange={onScrollPositionChange}
    >
      <SimpleGrid cols={6} spacing={325}>
        <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
          <Group>
            <MoodNeutral size={18} color={theme.colors.indigo[6]} />
            <Title order={6}>None</Title>
            <Text color="dimmed" size="xs">
              {data?.tasks.filter((task: { status: string }) => task.status == "NONE").length}
            </Text>
          </Group>
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              <NoneDndTaskBoard data={data} />
            )}
          </ScrollArea>
        </Stack>
        <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
          <Group>
            <ChartPie2 size={18} color={theme.colors.yellow[6]} />
            <Title order={6}>In Progress</Title>
            <Text color="dimmed" size="xs">
              {
                data?.tasks.filter((task: { status: string }) => task.status == "IN_PROGRESS")
                  .length
              }
            </Text>
          </Group>
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              <InProgressDndTaskBoard data={data} />
            )}
          </ScrollArea>
        </Stack>
        <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
          <Group>
            <Circle size={18} />
            <Title order={6}>Todo</Title>
            <Text color="dimmed" size="xs">
              {data?.tasks.filter((task: { status: string }) => task.status == "TO_DO").length}
            </Text>
          </Group>
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              <ToDoDndTaskBoard data={data} />
            )}
          </ScrollArea>
        </Stack>
        <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
          <Group>
            <CircleDotted size={18} />
            <Title order={6}>Backlog</Title>
            <Text color="dimmed" size="xs">
              {data?.tasks.filter((task: { status: string }) => task.status == "BACKLOG").length}
            </Text>
          </Group>
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              <BacklogDndTaskBoard data={data} />
            )}
          </ScrollArea>
        </Stack>
        <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
          <Group>
            <CircleCheck size={18} color={theme.colors.green[6]} />
            <Title order={6}>Done</Title>
            <Text color="dimmed" size="xs">
              {data?.tasks.filter((task: { status: string }) => task.status == "DONE").length}
            </Text>
          </Group>
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              <DoneDndTaskBoard data={data} />
            )}
          </ScrollArea>
        </Stack>
        <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
          <Group>
            <CircleX size={18} color={theme.colors.red[6]} />
            <Title order={6}>Canceled</Title>
            <Text color="dimmed" size="xs">
              {data?.tasks.filter((task: { status: string }) => task.status == "CANCELED").length}
            </Text>
          </Group>
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              <CancelDndTaskBoard data={data} />
            )}
          </ScrollArea>
        </Stack>
      </SimpleGrid>
    </ScrollArea>
  );
};

const DndTaskList = ({ statusData }: { statusData: any }) => {
  const [state, handlers] = useListState([...statusData]);
  const [task, setTasks] = useState<{ id: string }[]>([]);

  useEffect(() => {
    setTasks(state);
  }, [state]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
        setTasks(state);
      }}
    >
      <Droppable droppableId="task-list" direction="vertical">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {state.map((t: any, index: number) => (
              <Draggable key={t.id} draggableId={t.id} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const InProgressDndTaskList = ({ data }: { data: any }) => {
  const inProgressData = data?.tasks.filter((t: { status: string }) => t.status == "IN_PROGRESS");

  return <DndTaskList statusData={inProgressData} />;
};

const ToDoDndTaskList = ({ data }: { data: any }) => {
  const toDoData = data?.tasks.filter((t: { status: string }) => t.status == "TO_DO");

  return <DndTaskList statusData={toDoData} />;
};

const BacklogDndTaskList = ({ data }: { data: any }) => {
  const backlogData = data?.tasks.filter((t: { status: string }) => t.status == "BACKLOG");

  return <DndTaskList statusData={backlogData} />;
};

const DoneDndTaskList = ({ data }: { data: any }) => {
  const doneData = data?.tasks.filter((t: { status: string }) => t.status == "DONE");

  return <DndTaskList statusData={doneData} />;
};

const NoneDndTaskList = ({ data }: { data: any }) => {
  const noneData = data?.tasks.filter((t: { status: string }) => t.status == "NONE");

  return <DndTaskList statusData={noneData} />;
};

const CancelDndTaskList = ({ data }: { data: any }) => {
  const cancelData = data?.tasks.filter((t: { status: string }) => t.status == "CANCELED");

  return <DndTaskList statusData={cancelData} />;
};

export const OverviewContent = () => {
  /*  const task: Task = {
    code: "MIN-169",
    title: "Definir e implementar Splash Screen e Icono del app Vax Canina",
    priority: "low",
    status: "in-progress",
    // assigned: {
    //   name: "BM",
    // },
    createdAt: new Date(),
    project: {
      name: "Minsky",
    },
  }; */
  const { classes, theme } = useStyles();

  // const theme = useMantineTheme();
  const [newTaskOpened, setNewTaskOpened] = useState(false);
  const [createMore, setCreateMore] = useState(false);

  const [viewMode, setViewMode] = useState<"list" | "columns">("list");

  useEffect(() => {
    setViewMode(getCookie("viewMode") === "columns" ? "columns" : "list");
  }, []);

  useEffect(() => {
    setCookie("viewMode", viewMode, {
      maxAge: 30 * 24 * 60 * 60,
    });
  }, [viewMode]);

  const [{ data: tasksData, fetching: isFetchingTasksData }] = useQuery({
    query: TasksDocument,
  });

  type filterTypes =  TaskStatus[] | Member[] | TaskPriority[] | LabelType[] | Project[] | Object;

  const [filterList, setFilterList] = useState<Object[]>([]);

    const [openedMenu, setOpenedMenu] = useState(false);
    

    const ref = useClickOutside(() => {
      setOpenedMenu(false);
      switch (filter) {
        case "status":
          if (statusFilters.length > 0){
            setFilterList([...filterList, {name: 'status', elements: statusFilters}]);
          }
          setStatusFilters([]);
        case "assignee":
          return;
        case "creator":
          return;
        case "priority":
          return;
        case "labels":
          return;
        case "project":
          return;
      }
    });


  const [filter, setFilter] = useState<String>("");

  const addFilter = (newFilter : String) => {
    setFilter(newFilter);
  };

  const [statusFilters, setStatusFilters] = useState<TaskStatus[]>([]);
  const handleChangeStatus = (status: TaskStatus) => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter(filter => filter !== status));
    } else {
      setStatusFilters([...statusFilters, status]);
    }
  };
  const [assigneeFilters, setAssigneeFilters] = useState<Member[]>([]);
  const [creatorFilters, setCreatorFilters] = useState<Member[]>([]);
  const [priorityFilters, setPriorityFilters] = useState<TaskPriority[]>([]);
  const [labelsFilters, setLabelsFilters] = useState<LabelType[]>([]);
  const [projectFilters, setProjectFilters] = useState<Project[]>([]);
  const { membersData, isLoadingMembers } = useData();
  const { projectsData, isLoadingProjects } = useData();

  const FilterDropdown= (
    filter: String,
  ) : React.ReactNode => {
    
    switch (filter) {
      case "status":
        return <>
          <TextInput
            placeholder="Status"
            variant="filled"
            rightSection={<Kbd px={8}>P</Kbd>}
          ></TextInput>
          <Menu.Divider />
          <Menu.Item onClick={() => handleChangeStatus(TaskStatus.None)}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                checked={statusFilters.includes(TaskStatus.None)}
                onChange={() => handleChangeStatus(TaskStatus.None)}
              />
              {StatusIcon(theme, TaskStatus.None, 18)}
              {statusName(TaskStatus.None)}
            </Group>
          </Menu.Item>
          <Menu.Item onClick={() => handleChangeStatus(TaskStatus.Backlog)}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                checked={statusFilters.includes(TaskStatus.Backlog)}
                onChange={() => handleChangeStatus(TaskStatus.Backlog)}
              />
              {StatusIcon(theme, TaskStatus.Backlog, 18)}
              {statusName(TaskStatus.Backlog)}
            </Group>
          </Menu.Item>
          <Menu.Item onClick={() => handleChangeStatus(TaskStatus.ToDo)}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                checked={statusFilters.includes(TaskStatus.ToDo)}
                onChange={() => handleChangeStatus(TaskStatus.ToDo)}
              />
              {StatusIcon(theme, TaskStatus.ToDo, 18)}
              {statusName(TaskStatus.ToDo)}
            </Group>
          </Menu.Item>
          <Menu.Item onClick={() => handleChangeStatus(TaskStatus.InProgress)}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                checked={statusFilters.includes(TaskStatus.InProgress)}
                onChange={() => handleChangeStatus(TaskStatus.InProgress)}
              />
              {StatusIcon(theme, TaskStatus.InProgress, 18)}
              {statusName(TaskStatus.InProgress)}
            </Group>
          </Menu.Item>
          <Menu.Item onClick={() => handleChangeStatus(TaskStatus.Done)}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                checked={statusFilters.includes(TaskStatus.Done)}
                onChange={() => handleChangeStatus(TaskStatus.Done)}
              />
              {StatusIcon(theme, TaskStatus.Done, 18)}
              {statusName(TaskStatus.Done)}
            </Group>
          </Menu.Item>
          <Menu.Item onClick={() => handleChangeStatus(TaskStatus.Canceled)}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                checked={statusFilters.includes(TaskStatus.Canceled)}
                onChange={() => handleChangeStatus(TaskStatus.Canceled)}
              />
              {StatusIcon(theme, TaskStatus.Canceled, 18)}
              {statusName(TaskStatus.Canceled)}
            </Group>
          </Menu.Item>
        </>;
      case "assignee":
        return <>
          <TextInput
            placeholder="Assignee"
            variant="filled"
            rightSection={<Kbd px={8}>P</Kbd>}
          ></TextInput>
          <Menu.Divider />
          {isLoadingMembers ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          membersData?.members.map(m => {
            return (
              <Menu.Item key={m.id} onClick={()=>{addFilter("")}}>
              <Group spacing={10}>
                  <Checkbox
                    size="xs"
                    //checked={selectedLabels.includes(label)}
                    //onChange={() => onChange(label)}
                  />
                  {AssigneePhoto(m)}
                  {AssigneeName(m)}
                </Group>
              </Menu.Item>
            );
          })
        )}
        </>;
      case "creator":
        return <>
          <TextInput
            placeholder="Creator"
            variant="filled"
            rightSection={<Kbd px={8}>P</Kbd>}
          ></TextInput>
          <Menu.Divider />
          {isLoadingMembers ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          membersData?.members.map(m => {
            return (
              <Menu.Item key={m.id} onClick={()=>{addFilter("")}}>
              <Group spacing={10}>
                  <Checkbox
                    size="xs"
                    //checked={selectedLabels.includes(label)}
                    //onChange={() => onChange(label)}
                  />
                  {AssigneePhoto(m)}
                  {AssigneeName(m)}
                </Group>
              </Menu.Item>
            );
          })
        )}
        </>;
      case "priority":
        return <>
          <TextInput
            placeholder="Status"
            variant="filled"
            rightSection={<Kbd px={8}>P</Kbd>}
          ></TextInput>
          <Menu.Divider />
          <Menu.Item onClick={()=>{addFilter("")}}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                //checked={selectedLabels.includes(label)}
                //onChange={() => onChange(label)}
              />
              {PriorityIcon(TaskPriority.None, 18)}
              {priorityName(TaskPriority.None)}
            </Group>
          </Menu.Item>
          <Menu.Item onClick={()=>{addFilter("")}}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                //checked={selectedLabels.includes(label)}
                //onChange={() => onChange(label)}
              />
              {PriorityIcon(TaskPriority.Low, 18)}
              {priorityName(TaskPriority.Low)}
            </Group>
          </Menu.Item>
          <Menu.Item onClick={()=>{addFilter("")}}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                //checked={selectedLabels.includes(label)}
                //onChange={() => onChange(label)}
              />
              {PriorityIcon(TaskPriority.Medium, 18)}
              {priorityName(TaskPriority.Medium)}
            </Group>
          </Menu.Item>
          <Menu.Item onClick={()=>{addFilter("")}}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                //checked={selectedLabels.includes(label)}
                //onChange={() => onChange(label)}
              />
              {PriorityIcon(TaskPriority.High, 18)}
              {priorityName(TaskPriority.High)}
            </Group>
          </Menu.Item>
          <Menu.Item onClick={()=>{addFilter("")}}>
          <Group spacing={10}>
              <Checkbox
                size="xs"
                //checked={selectedLabels.includes(label)}
                //onChange={() => onChange(label)}
              />
              {PriorityIcon(TaskPriority.Urgent, 18)}
              {priorityName(TaskPriority.Urgent)}
            </Group>
          </Menu.Item>
        </>;
      case "labels":
        return <>
          <TextInput
            placeholder="Status"
            variant="filled"
            rightSection={<Kbd px={8}>P</Kbd>}
          ></TextInput>
          <Menu.Divider />
            {Object.values(LabelType).map(label => (
            <Menu.Item
              onClick={()=>{addFilter("")}}
              key={label}
            >
              <Group spacing={10}>
                <Checkbox
                  size="xs"
                  id={label}
                  //checked={selectedLabels.includes(label)}
                  //onChange={() => onChange(label)}
                />
                {LabelColor(label, theme)}
                {LabelName(label)}
              </Group>
            </Menu.Item>
          ))}
        </>;
      case "project":
        return <>
          <TextInput
            placeholder="Status"
            variant="filled"
            rightSection={<Kbd px={8}>P</Kbd>}
          ></TextInput>
          <Menu.Divider />
          {isLoadingProjects ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          projectsData?.projects.map(p => {
            return (
              <Menu.Item key={p.id} onClick={()=>{addFilter("")}}>
              <Group spacing={10}>
                  <Checkbox
                    size="xs"
                    //checked={selectedLabels.includes(label)}
                    //onChange={() => onChange(label)}
                  />
                  {ProjectIcon(p)}
                  {ProjectName(p)}
                </Group>
              </Menu.Item>
            );
          })
        )}
        </>;
    }
      return <>
        <TextInput
          placeholder="Filter..."
          variant="filled"
          rightSection={<Kbd px={8}>P</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item onClick={()=>{addFilter("status")}} icon={<CircleDashed size={18} />}>Status</Menu.Item>
        <Menu.Item onClick={()=>{addFilter("assignee")}} icon={<UserCircle size={18} />}>Assignee</Menu.Item>
        <Menu.Item onClick={()=>{addFilter("creator")}} icon={<UserCheck size={18} />}>Creator</Menu.Item>
        <Menu.Item onClick={()=>{addFilter("priority")}} icon={<AntennaBars5 size={18} />}>Priority</Menu.Item>
        <Menu.Item onClick={()=>{addFilter("labels")}} icon={<Tag size={18} />}>Labels</Menu.Item>
        <Menu.Item onClick={()=>{addFilter("project")}} icon={<LayoutGrid size={18} />}>Project</Menu.Item>
      </>;
  };

  const FilterListView = (
    filter:any,
    index:number,
  ) : ReactNode => {
    if (filter.name == "status"){
      if (filter.elements.length > 1){
        return <Group key={index} spacing={6}>
        <Button
              styles={{root: {border:'1px solid'}}}
              className={classes["text-header-buttons"]}
              compact
              variant="subtle"
              color={"gray"}
              leftIcon={<CircleDashed size={16}/>}
            >
              Status is any of 
              <Group mr={10} ml={10} spacing={0}>
              {(filter.elements).map(function (filter: TaskStatus, index: number) {
                return <div key={index}>{StatusIcon(theme,filter)}</div>;
              })}
              </Group>
              {filter.elements.length} states 
        </Button>
      </Group>
      }
      else{
        return <Group key={index} spacing={6}>
        <Button
              styles={{root: {border:'1px solid'}}}
              className={classes["text-header-buttons"]}
              compact
              variant="subtle"
              color={"gray"}
              leftIcon={<CircleDashed size={16}/>}
            >
              Status is
              <Group mr={10} ml={10} spacing={0}>
              <CircleDashed size={16}/>
              </Group>
              {statusName(filter.elements[0])} 
        </Button>
      </Group>
      }
    }
  };

  const [opened, setOpened] = useState(false);
  // console.log(tasksData);
  // const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  return (
    <>
      <Modal
        centered
        overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.5}
        // overlayBlur={3}
        transition={"slide-up"}
        size={"lg"}
        opened={newTaskOpened}
        onClose={() => setNewTaskOpened(false)}
        shadow="md"
        title={
          <Group spacing={8}>
            {/* <Button
              compact
              variant="light"
              color={"gray"}
              leftIcon={<Dna size={16} color={theme.colors.red[4]} />}
            >
              MIN
            </Button> */}
            <TeamSelector initialTeam={undefined} /> {/* change to current team*/}
            <Text size={"sm"}>New Task</Text>
          </Group>
        }
      >
        <Box>
          <TextInput placeholder="Task Title" variant="unstyled" size="lg" autoFocus />
          <Textarea placeholder="Add description..." variant="unstyled" size="sm" />
        </Box>
        <Group spacing={6} mb={"md"}>
          <StatusSelector initialStatus={TaskStatus.Backlog} />
          <PrioritySelector initialPriority={TaskPriority.None} />
          <AssigneeSelector initialAssignee={undefined} />
          <LabelSelector initialLabel={[]} />
          <ProjectSelector initialProject={undefined} />
        </Group>
        <Group
          pt={"md"}
          position="right"
          sx={{
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderTopColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }}
        >
          <Switch
            label="Create more"
            size="xs"
            checked={createMore}
            onChange={e => setCreateMore(e.currentTarget.checked)}
          />
          {/* {!createMore && "s"} */}
          <Button compact variant="filled">
            Create Task
          </Button>
        </Group>
      </Modal>
      <Drawer
        className={classes.drawer}
        size="100%"
        opened={opened}
        onClose={() => setOpened(false)}
        // size={theme.fn.largerThan(300)}
        sx={theme => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <NavbarSearch
          onNewTask={() => {
            setNewTaskOpened(true);
            setOpened(false);
          }}
          openedNav={opened}
          setOpenedNav={setOpened}
        />
      </Drawer>
      <AppShell
        padding={0}
        navbar={
          <NavbarSearch
            onNewTask={() => {
              setNewTaskOpened(true);
            }}
            openedNav={false}
            setOpenedNav={() => true}
          />
        }
        styles={theme => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
        navbarOffsetBreakpoint="sm"
        fixed
      >
        <Group
          h={{base: 100, sm: 73.5}}
          position="apart"
          sx={{
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
            marginBottom: theme.spacing.md,
            padding: theme.spacing.md,
            "&:not(:last-of-type)": {
              borderBottom: `1px solid ${
                theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
              }`,
            },
          }}
        >
          <Group spacing="md">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(true)}
                className={classes.burger}
                size="sm"
              />
            </MediaQuery>
            <Button
              className={classes["text-header-buttons"]}
              compact
              variant="light"
              color={"gray"}
              leftIcon={
                <Dna
                  className={classes["icon-header-buttons"]}
                  size={16}
                  color={theme.colors.red[4]}
                />
              }
            >
              Minsky Phi
            </Button>
            <Menu shadow="md" width={120}>
              <Menu.Target>
                <Button
                  className={classes["text-header-buttons"]}
                  compact
                  variant="subtle"
                  color={"gray"}
                  // leftIcon={<Dna size={16} color={theme.colors.red[4]} />}
                >
                  Active Tasks
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {/* <Menu.Label>Set Priority</Menu.Label> */}
                {/* <TextInput
                  placeholder="Change Priority..."
                  variant="filled"
                  rightSection={<Kbd px={8}>P</Kbd>}
                ></TextInput>
                <Menu.Divider /> */}
                <Menu.Item icon={<BoxMultiple size={18} />}>Active</Menu.Item>
                <Menu.Item icon={<CircleDashed size={18} />}>Backlog</Menu.Item>
                <Menu.Item icon={<BoxModel size={18} />}>All</Menu.Item>
                <Menu.Item icon={<Archive size={18} />}>Archive</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            {filterList.length == 0 ? 
              <Menu shadow="md" width={250} opened={openedMenu}>
              <Menu.Target>
                <Button
                  styles={{root: {border:'1px dashed'}}}
                  className={classes["text-header-buttons"]}
                  compact
                  p={5}
                  variant="subtle"
                  color={"gray"}
                  leftIcon={ <Plus size={16} color={theme.colors.red[4]} /> }
                  onClick={ () => {
                    addFilter("");
                    setOpenedMenu(true)}
                  }
                >
                  Filter
                </Button>
              </Menu.Target>
              <Box ref={ref}>
                <Menu.Dropdown>
                  {FilterDropdown(filter)}
                </Menu.Dropdown>
              </Box>
            </Menu>
            :
            <Button
            styles={{root: {border:'1px dashed'}}}
            className={classes["text-header-buttons"]}
            compact
            variant="subtle"
            color={"gray"}
            leftIcon={ <X size={16} color={theme.colors.red[4]} /> }
            onClick={ 
              () => {
                addFilter("");
                setFilterList([])}
            }
          >
            Clear filters
          </Button>
            }

            {/* <Title order={5}>Active Tasks</Title> */}
          </Group>
          <Group>
            <SegmentedControl
              className={classes["segmented-control"]}
              size={"xs"}
              value={viewMode}
              onChange={value => setViewMode(value as "list" | "columns")}
              transitionTimingFunction="ease"
              data={[
                {
                  label: (
                    <Center>
                      <LayoutRows className={classes["icon-view-buttons"]} size={16} />
                      <Text className={classes["text-view-buttons"]} ml={6} size={"xs"}>
                        List
                      </Text>
                    </Center>
                  ),
                  value: "list",
                },
                {
                  label: (
                    <Center>
                      <LayoutColumns className={classes["icon-view-buttons"]} size={16} />
                      <Text className={classes["text-view-buttons"]} size={"xs"} ml={6}>
                        Board
                      </Text>
                    </Center>
                  ),
                  value: "columns",
                },
                // { label: 'Vue', value: 'vue' },
                // { label: 'Svelte', value: 'svelte' },
              ]}
            />
          </Group>
        </Group>
        {viewMode === "list" ? (
          <Container>
            {filterList.length > 0 ? 
          <>
          <Flex 
            mt={{base: 50, sm: 0}}
            mih={50}
            gap={{base : 'xl', sm: 'sm'}}
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            {filterList.map(function (filter, index) {
              return FilterListView(filter, index);
            })}
            <Menu shadow="md" width={250} opened={openedMenu}>
              <Menu.Target>
                <Button
                  className={classes["text-header-buttons"]}
                  compact
                  variant="subtle"
                  color={"gray"}
                  leftIcon={<Plus size={16} color={theme.colors.red[4]} />}
                  onClick={ () => {
                    addFilter("");
                    setOpenedMenu(true)}
                  }
                >
                </Button>
              </Menu.Target>
              <Box ref={ref}>
                <Menu.Dropdown>
                  {FilterDropdown(filter)}
                </Menu.Dropdown>
              </Box>
            </Menu>
          </Flex>
          <Divider my="sm" />

          </>
            :
            null}
            <Group spacing={6} mt={16} mb={8}>
              <MoodNeutral size={18} color={theme.colors.indigo[6]} />
              <Title order={6}>None</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "NONE").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              // tasksData?.tasks
              //   .filter(t => t.status == "NONE")
              //   .map(t => {
              //     return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
              //   })
              <NoneDndTaskList data={tasksData} />
            )}
            <Group spacing={6} mt={16} mb={8}>
              <ChartPie2 size={18} color={theme.colors.yellow[6]} />
              <Title order={6}>In Progress</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "IN_PROGRESS").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              // tasksData?.tasks
              //   .filter(t => t.status == "IN_PROGRESS")
              //   .map(t => {
              //     return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
              //   })
              <InProgressDndTaskList data={tasksData} />
            )}
            <Group spacing={6} mt={16} mb={8}>
              <Circle size={18} />
              <Title order={6}>Todo</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "TO_DO").length}
              </Text>
            </Group>
            {/* <TaskListElement task={{ ...task, status: "todo" }} /> */}
            {isFetchingTasksData ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              // tasksData?.tasks
              //   .filter(t => t.status == "TO_DO")
              //   .map(t => {
              //     return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
              //   })
              <ToDoDndTaskList data={tasksData} />
            )}
            <Group spacing={6} mt={16} mb={8}>
              <CircleDotted size={18} />
              <Title order={6}>Backlog</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "BACKLOG").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              // tasksData?.tasks
              //   .filter(t => t.status == "BACKLOG")
              //   .map(t => {
              //     return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
              //   })
              <BacklogDndTaskList data={tasksData} />
            )}
            <Group spacing={6} mt={16} mb={8}>
              <CircleCheck size={18} color={theme.colors.green[6]} />
              <Title order={6}>Done</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "DONE").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              // tasksData?.tasks
              //   .filter(t => t.status == "DONE")
              //   .map(t => {
              //     return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
              //   })
              <DoneDndTaskList data={tasksData} />
            )}
            <Group spacing={6} mt={16} mb={8}>
              <CircleX size={18} color={theme.colors.red[6]} />
              <Title order={6}>Canceled</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "CANCELED").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton
                height={36}
                radius="sm"
                sx={{
                  "&::after": {
                    background: theme.colorScheme === "dark" ? "#343A4033" : "#e8ebed",
                  },
                }}
              />
            ) : (
              // tasksData?.tasks
              //   .filter(t => t.status == "CANCELED")
              //   .map(t => {
              //     return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
              //   })
              <CancelDndTaskList data={tasksData} />
            )}
          </Container>
        ) : (
          <OverviewContentBoard data={tasksData} fetching={isFetchingTasksData} />
        )}
      </AppShell>
    </>
  );
};
