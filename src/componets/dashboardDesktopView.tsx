import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import GetRowStyle from '../componets/getRowStyle';
import '../css/lookLikeATable.css';
import classNames from 'classnames';
 
interface Detail {
    assigned_to_extra_info: [];
    username: string;
    url: string;
    subject: string;
    due_date: string;
    milestone_slug: string;
    status_extra_info: string;
    user_story_extra_info: string;
    namez: string;
    storysubject: string;
    id: number
}

interface dashboardDesktopView {
    data: Detail[];
}
const getRowStyle = (index: number) => {
    return index % 2 === 0 ? 'rowEven' : 'rowOdd';
  };
 const dashboardDesktop: React.FC<dashboardDesktopView> = ({ data }) => {
 return <div style={{ width: '80%', marginLeft: '10%', padding: '10px' }}>
          <div>
            <div className='rowParentTH'>
            <div className='data'>Assigned To</div>
            <div className='data'>Task</div>
            <div className='data'>Project</div>
            <div className='data'>Column</div>
            <div className='data'>Epic</div>
            <div className='data'>Due Date</div>
            <div className='data'>Edit</div>
            </div>
          </div>
          <div>
          {data.map((item, index)  => { 
          return <div key={item.id} className={classNames('rowParent', getRowStyle(index))}>
            <div className='data'>{item?.username}</div>
              <div className={GetRowStyle(item.due_date)} >{item?.subject}</div>
              <div className='data'>{item?.milestone_slug}</div>
              <div className='data'>{item?.namez}</div>
              <div className='data'>{item?.storysubject}</div>
              <div className={GetRowStyle(item.due_date)}>{item?.due_date}</div>
              <div className='data'><a href={item?.url} target="_blank">&#8634;</a></div>
            </div>;
        })}
          </div>
      </div> }
export default dashboardDesktop;