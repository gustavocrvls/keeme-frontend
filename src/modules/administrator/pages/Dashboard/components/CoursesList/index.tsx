import { Heading } from '@chakra-ui/react';
import { UsersList } from './components/UsersList';
import { CoursesListProps } from './dtos';

export function CoursesList({
  courses,
  editCoordinator,
  deleteCoordinator,
}: CoursesListProps): JSX.Element {
  return (
    <ul style={{ listStyle: 'none', margin: 0 }}>
      {courses.map(course => (
        <>
          <li>
            <Heading as="h3" size="sm">
              {course.name}
            </Heading>
          </li>
          <UsersList
            users={course.users}
            deleteCoordinator={deleteCoordinator}
            editCoordinator={editCoordinator}
          />
        </>
      ))}
    </ul>
  );
}
