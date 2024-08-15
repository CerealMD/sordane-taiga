import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import GetRowStyle from '../componets/getRowStyle';
 
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

interface dashboardMobileView {
    data: Detail[];
}
 const dashboardMobile: React.FC<dashboardMobileView> = ({ data }) => {
 return <div style={{ width: '80%', marginLeft: '10%', paddingBottom: '10px' }}>
          <div>
            <div className='rowParent rowParentTH'>
            <div style={{ width: '50%', textAlign: 'center' }}>Assigned To</div>
            <div style={{ width: '50%', textAlign: 'center' }}>Task</div>
            </div>
          </div>
          <div>
          {data.map((item)  => { 
          return <a key={item.id} className='rowParent '>
            <div style={{ width: '50%', textAlign: 'center' }} className={GetRowStyle(item.due_date)}>{item?.username}</div>
              <div style={{ width: '50%', textAlign: 'center' }} className={GetRowStyle(item.due_date)} >{item?.subject}</div>
            </a>;
        })}
          </div>
      </div> }
export default dashboardMobile;