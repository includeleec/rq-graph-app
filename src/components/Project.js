import React, { useState } from "react";

import { useGetProject } from "../useRequest";
export default function Project() {

    const [projectId, setProjectId] = useState("icp123")

    const { data, error, isLoading, isSuccess } = useGetProject(projectId);

    console.log({ data, error, isLoading, isSuccess })
  return (
    <div>
        <input type="text" value={projectId} onChange={e => setProjectId(e.target.value)} />
        <ul>{data && data.map(item => 
        <li>
            {item.project_id} - {item.count} - {item.event_date}
        </li>)} </ul>
    </div>
  );
}