import type { NextPage } from 'next';
import * as React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LifeTitle, LifeTitleShort, LifeType } from '../constant';

const IndexPage: NextPage = () => {
  const [ result, setResult ]: [ any, any ] = useState(null);
  const [dateSubmitted, setDateSubmitted] = useState('');

  useEffect(() => {
    const date = localStorage.getItem('assessment-dateSubmitted');
    const result: any = JSON.parse(localStorage.getItem('assessment-result') || 'null');

    if (date) {
      setDateSubmitted(date);
    }

    if (result) {
      const data: any = Object.values(result).reduce((acc: any, current: any) => {
        acc[current.type] = {
          ...(acc[current.type] || {}),
          type: current.type,
          mark: (acc[current.type]?.mark || 0) + current.mark
        };
        return acc;
      }, {});

      setResult(Object.values(data));
    }
  }, []);

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-2/3 p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white">
        {!result && <div className="mb-2"> Chưa có kết quả</div>}

        {result && (
          <div>
            <div>
              <p className="text-xl uppercase font-bold">Kết quả đánh giá sức khoẻ đời sống thuộc linh</p>
              <div className="my-2">
                <p>
                  <span className="text-md font-bold">Người đánh giá:</span>
                  <span className="text-sm ml-3">Chính mình</span>
                </p>
                <p>
                  <span className="text-md font-bold">Thời gian đánh giá:</span>
                  <span className="text-sm ml-3">{dateSubmitted || 'Chưa có thông tin'}</span>
                </p>
              </div>

              <hr/>

              <TableContainer component={Paper}>
                <Table aria-label="result table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"><strong>Mảng</strong></TableCell>
                      <TableCell align="left"><strong>Điểm</strong></TableCell>
                      <TableCell align="left"><strong>Lời khuyên</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result
                      .sort((a: any, b: any) => b.mark - a.mark)
                      .map((row: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{LifeTitle[row.type as LifeType]}</TableCell>
                        <TableCell align="left">{row.mark}</TableCell>
                        <TableCell align="left">{Advise(row.mark)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </div>
            <div className="w-full mt-3" id="chart-result">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result.map((x: any) => ({...x, type: LifeTitleShort[x.type as LifeType] }))}>
                  <PolarGrid/>
                  <PolarAngleAxis dataKey="type" fontSize="13"/>
                  <PolarRadiusAxis domain={[ 0, 35 ]}/>
                  <Tooltip/>
                  <Radar name="Result" dataKey="mark" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <Link href="/khao-sat">
          <Button variant="contained">
            Làm {result && 'lại'} khảo sát
          </Button>
        </Link>
      </div>
    </div>
  );
};

function Advise(mark: number = 0) {
  if (mark < 21) {
    return (<p className="text-red-500">Điểm yếu cần cải thiện</p>);
  }

  if (mark < 30) {
    return (<p className="text-blue-500">Ổn, cần phát huy</p>);
  }

  return (<p className="text-green-500">Điểm mạnh cần phát triển</p>);
}

export default IndexPage;
