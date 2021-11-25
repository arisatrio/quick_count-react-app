import React, { useState, useEffect } from 'react'
import { db } from '../../firebase-config';
import { collection, onSnapshot, query, orderBy, limit } from '@firebase/firestore';
import { Card, Col, Row, Typography } from 'antd';

export default function CardTotalDptComponent(){
    const { Title } = Typography;
    const profile = [
        <svg
          width="22"
          height="22"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key={0}
        >
          <path
            d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
            fill="#fff"
          ></path>
          <path
            d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
            fill="#fff"
          ></path>
          <path
            d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
            fill="#fff"
          ></path>
          <path
            d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
            fill="#fff"
          ></path>
        </svg>,
    ];

    const [total, setTotal] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const totalDPTcollection = collection(db, "totalDPT");

    useEffect(() => {
        const q = query(totalDPTcollection, orderBy('created_at', 'desc'), limit(1));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const res = querySnapshot.docs[0];
            const data = res.data();

            setTotal(data);
            setCreatedAt(data.created_at.toDate().toLocaleDateString('id-ID') + ' ' + data.created_at.toDate().toLocaleTimeString('en-GB')); 
        });

        return () => unsub();

    }, [])

    return (
        <Card style={{ marginBottom: '10px'  }}>
            <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18} sm={24}>
                        <span>Total Daftar Pemilih Tetap (DPT)</span>
                        <Title level={3}>
                            {total.totalDPT}
                        </Title>
                        <small>Terakhir diperbaharui : <i>{createdAt}</i></small>
                    </Col>
                    <Col xs={6}>
                        <div className="icon-box">{profile}</div>
                    </Col>
                </Row>
            </div>
        </Card>
    );
}