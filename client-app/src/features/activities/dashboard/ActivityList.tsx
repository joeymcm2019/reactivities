import React, {SyntheticEvent, useState} from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

export default observer ( function ActivityList() {

  const [target, setTarget] = useState("");
  const { activityStore } = useStore();
  const { deleteActivity, activitiesByDate, loading } = activityStore;

  function handleDeleteActivity(event: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }

  function scrollUp() {
    window.scroll({
      top: 0,
      left: 0,
    })
  }

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button as={NavLink} to={`/activities/${activity.id}`} onClick={scrollUp} floated='right' content='View' color='blue' />
                <Button
                  name={activity.id}
                  loading={loading && target === activity.id}
                  onClick={(e) => handleDeleteActivity(e, activity.id)}
                  floated='right'
                  content='Delete'
                  color='red' />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
})