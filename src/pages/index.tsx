import type { NextPage } from 'next';
import * as React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link'


const Home: NextPage = () => {
  return (
    <div>
      <div>
        Chưa có kết quả
      </div>

      <Link href="/khao-sat">
        <Button variant="contained">
          Làm khảo sát
        </Button>
      </Link>
    </div>
  );
};

export default Home;
