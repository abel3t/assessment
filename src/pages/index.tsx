import type { NextPage } from 'next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

import { LifeTitle, LifeTitleShort, LifeType, UserWasAssessedType } from '../constant';
import { IUserWasAssessed } from '../slices/assessment-questions.slice';

const IndexPage: NextPage = () => {
  const [ result, setResult ]: [ any, any ] = useState(null);
  const [ dateSubmitted, setDateSubmitted ] = useState('');
  const [ userAssessName, setUserAssessName ]: [ string, any ] = useState('');
  const [ userWasAssessed, setUserWasAssessed ]: [ IUserWasAssessed, any ] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const date = localStorage.getItem('assessment-dateSubmitted');
    const result: any = JSON.parse(localStorage.getItem('assessment-result') || 'null');
    const name = localStorage.getItem('assessment-name');
    const storageUserWasAssessed = JSON.parse(localStorage.getItem('userWasAssessed') || 'null');

    if (date) {
      setDateSubmitted(date);
    }

    if (storageUserWasAssessed) {
      setUserWasAssessed(storageUserWasAssessed);
    }

    if (name) {
      setUserAssessName(name);
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

    setIsLoaded(true);
  }, []);

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-2/3 p-2 md:p-3 lg:p-4 mb-3 border-gray-400 rounded-lg bg-white">
        {!isLoaded && <div className="mb-3">
          <Skeleton variant="rectangular" height={20}  className="mt-1 w-full md:w-3/4 lg:w-2/3"/>
          <Skeleton variant="rectangular" height={50}  className="mt-1 w-full md:w-3/4 lg:w-2/3"/>
          <Skeleton variant="rectangular" height={150} className="mt-1 w-full md:w-3/4 lg:w-2/3" />
          <Skeleton variant="rectangular" height={150} className="mt-1 w-full md:w-3/4 lg:w-2/3" />
          <Skeleton variant="rectangular" height={100} className="mt-1 w-full md:w-3/4 lg:w-2/3" />
        </div>}
        {isLoaded && !result && <div className="mb-5">
          Ch??a c?? k???t qu???. L??m kh???o s??t ngay nh??!</div>}

        {isLoaded && result && (
          <div>
            <div>
              <p className="text-xl uppercase font-bold">K???t qu??? ????nh gi?? s???c kho??? ?????i s???ng thu???c linh</p>
              <div className="my-2">
                {
                  userWasAssessed?.type !== UserWasAssessedType.Other &&
                  <p>
                    <span className="text-md font-bold">Ng?????i ????nh gi??:</span>
                    {
                      !!userAssessName &&
                      <span className="text-sm ml-3 text-bold">Ch??nh m??nh ({userAssessName})</span>
                    }
                    {
                      !userAssessName &&
                      <span className="text-sm ml-3 text-bold">Ch??a c?? th??ng tin</span>
                    }
                  </p>
                }

                {
                  userWasAssessed?.type === UserWasAssessedType.Other &&
                  <>
                    <p>
                      <span className="text-md font-bold">Ng?????i ????nh gi??:</span>
                      <span className="text-sm ml-3 text-bold">{userAssessName || 'Ch??a c?? th??ng tin'}</span>
                    </p>
                    <p>
                      <span className="text-md font-bold">Ng?????i ???????c ????nh gi??:</span>
                      <span className="text-sm ml-3 text-bold">{userWasAssessed?.name || 'Ch??a c?? th??ng tin'}</span>
                    </p>
                  </>
                }
                <p>
                  <span className="text-md font-bold">Th???i gian ????nh gi??:</span>
                  <span className="text-sm ml-3">{dateSubmitted || 'Ch??a c?? th??ng tin'}</span>
                </p>
              </div>

              <hr/>

              <TableContainer component={Paper}>
                <Table aria-label="result table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"><strong>M???ng</strong></TableCell>
                      <TableCell align="left"><strong>??i???m</strong></TableCell>
                      <TableCell align="left"><strong>L???i khuy??n</strong></TableCell>
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
            <div className="mt-3" id="chart-result">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%"
                            data={result.map((x: any) => ({ ...x, type: LifeTitleShort[x.type as LifeType] }))}>
                  <PolarGrid/>
                  <PolarAngleAxis dataKey="type" fontSize="10"/>
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
            L??m {result && 'l???i'} kh???o s??t
          </Button>
        </Link>
      </div>
    </div>
  );
};

function Advise(mark: number = 0) {
  if (mark < 21) {
    return (<p className="text-red-500">??i???m y???u c???n c???i thi???n</p>);
  }

  if (mark < 30) {
    return (<p className="text-blue-500">???n, c???n ph??t huy</p>);
  }

  return (<p className="text-green-500">??i???m m???nh c???n ph??t tri???n</p>);
}

export default IndexPage;
