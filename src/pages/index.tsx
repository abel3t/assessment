import type { NextPage } from 'next';
import * as React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const IndexPage: NextPage = () => {
  const [ result, setResult ] = useState(null);

  useEffect(() => {
    const result: any = JSON.parse(localStorage.getItem('assessment-result') || 'null');
    if (result) {
      const data: any = Object.values(result).reduce((acc: any, current: any) => {
        acc[current.type] = {
          ...(acc[current.type] || {}),
          type: current.type,
          mark: (acc[current.type]?.mark || 0) + current.mark
        };
        return acc;
      }, {});

      setResult(Object.values(data) as any);
    }
  }, []);

  console.log(result)
  return (
    <div>
      <div>
        Chưa có kết quả
      </div>

      {result && (
        <div className="w-full" style={{ height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result}>
              <PolarGrid/>
              <PolarAngleAxis dataKey="type"/>
              <PolarRadiusAxis/>
              <Tooltip />
              <Radar name="Result" dataKey="mark" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      <Link href="/khao-sat">
        <Button variant="contained">
          Làm {result && 'lại'} khảo sát
        </Button>
      </Link>
    </div>
  );
};

export default IndexPage;
