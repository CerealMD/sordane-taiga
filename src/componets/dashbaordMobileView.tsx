import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, useEffect } from 'react';
import GetRowStyle from '../componets/getRowStyle';
import DrillDownPopUp from './drillDownPopUp';
 
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

 const DashboardMobile: React.FC<dashboardMobileView> = ({ data }) => {
  const [openPopUpToken, setopenPopUpToken] = useState<object | null>(null);
  const handleMessage = async () => {

    setopenPopUpToken(null);
  
  };
  
  const handleClose = () => {

    setopenPopUpToken(null);
  };
  const openPopUp = (item: Detail) => {
    // console.log(item)
    setopenPopUpToken(item);
    
  };
 return <div style={{ width: '80%', marginLeft: '10%', paddingBottom: '10px' }}>
          <div>
            <div className='rowParent rowParentTH'>
            <div style={{ width: '50%', textAlign: 'center' }}>Due Date</div>
            <div style={{ width: '50%', textAlign: 'center' }}>Task</div>
            </div>
          </div>
          <div>
          {data.map((item, index)  => { 
          return <div key={index} >
            <div className='rowParent '>
            <div onClick={() => openPopUp(item)} style={{ width: '50%', textAlign: 'center' }} className={GetRowStyle(item.due_date)}>{item?.due_date}</div>
              <div onClick={() => openPopUp(item)} style={{ width: '50%', textAlign: 'center' }} className={GetRowStyle(item.due_date)} >{item?.subject}</div>
            </div>
            <div>
            {openPopUpToken && openPopUpToken == item && (
              <DrillDownPopUp data={item}  onMessage={handleMessage}
              onClose={handleClose}/>
            )}
            </div>
            </div>
        })}
          </div>
      </div> }
export default DashboardMobile;