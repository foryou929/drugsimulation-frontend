import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Input, Radio, Select, /*Table,*/ InputNumber } from 'antd'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import _ from 'lodash'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

import query from "../../utils/query";
import { Line } from 'react-chartjs-2';
import TitleCard from "../../components/Cards/TitleCard"

// const { Column, ColumnGroup } = Table;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

// Constants
const unit1 = ['%', '%', 'μg/mL', 'mg/kg/mL']
const unit2 = ['%', '%', 'μg/mL', 'μg/mL']
const ASA_PS_Options = [
    { value: 1, label: 'I' },
    { value: 2, label: 'II' },
    { value: 3, label: 'III' },
    { value: 4, label: 'IV' },
    { value: 5, label: 'V' },
]

const label1 = ['DES', 'SEV', 'Prop', 'Dose(RZ)']
const label2 = ['DES', 'SEV', 'Prop', 'RZ']
const Hypnotics_Options = [
    { value: 0, label: 'DES' },
    { value: 1, label: 'SEV' },
    { value: 2, label: 'Prop' },
    { value: 3, label: 'RZ' },
]

const Anesthetic = () => {
    const { t } = useTranslation();
    // Main params
    const [HT, setHT] = useState(170)
    const [BW, setBW] = useState(70)
    const [age, setAge] = useState(40)
    const [gendor, setGendor] = useState(0)
    const [ASA_PS, set_ASA_PS] = useState(1)

    // Cha Page
    const [LBM, setLBM] = useState(0) //C7
    const [ABW, setABW] = useState(0) //C9
    const [IBW, setIBW] = useState(0) //C10
    useEffect(() => {
        if (gendor == 0)
            setLBM(1.1 * BW - 128 * Math.pow(BW / HT, 2))
        else
            setLBM(1.07 * BW - 148 * Math.pow(BW / HT, 2))
    }, [HT, BW, gendor])
    useEffect(() => {
        setABW(IBW + 0.4 * (BW - IBW))
    }, [IBW, BW])
    useEffect(() => {
        setIBW(45.4 + 0.89 * (HT - 152.4) + 4.5 * (1 - gendor))
    }, [HT, gendor])
    // PKP Page
    const keo = 0.12 //B3
    const Thalfkeo = 5.8 //B4
    const Peakeffect = 3.559 //B5
    const V1 = 6.09 //B6
    const V2 = 28.121 //B12
    const V3 = 228.275 //B13
    const k21 = 0.102 //B7
    const k31 = 0.006 //B8
    const k10 = 0.0827 //B9
    const k12 = 0.471 //B10
    const k13 = 0.225 //B11
    const C1 = 30.219 //B14
    const C2 = 172.103 //B15
    const C3 = 82.215 //B16
    const CL1 = C1 / 60 //B17
    const CL2 = C2 / 60 //B18
    const CL3 = C3 / 60 //B19
    const Q = [0, 3.57, 11.3, 27.2, 1.03, 1.1, 0.401, 1.19, 0.308, 0.146, -0.184, 0.0205] // F 30-40
    const [R0, setR0] = useState(0) //E3
    const [RM0, setRM0] = useState(0) //F3
    const [D0, setD0] = useState(0) //G3
    const [D_Dyck0, setD_Dyck0] = useState(0) //H3
    const [R1, setR1] = useState(0) //E4
    const [RM1, setRM1] = useState(0) //F4
    const [D1, setD1] = useState(16.19158879) //G4
    const [D_Dyck1, setD_Dyck1] = useState(16.19158879) //H4
    const [V0, setV0] = useState([0, 0, 0, 0]) // EFGH 6
    const [V1_K12_K21, set_V1_K12_K21] = useState([0, 0, 0, 0]) // EFGH 19
    const [V1_K13_K31, set_V1_K13_K31] = useState([0, 0, 0, 0]) // EFGH 13
    const [CL2_V2, set_CL2_V2] = useState([0, 0, 0, 0]) // EFGH 7
    const [CL3_V3, set_CL3_V3] = useState([0, 0, 0, 0]) // EFGH 8
    const [CL1_V1, set_CL1_V1] = useState([0, 0, 0, 0]) // EFGH 9
    const [CL2_V1, set_CL2_V1] = useState([0, 0, 0, 0]) // EFGH 10
    const [CL3_V1, set_CL3_V1] = useState([0, 0, 0, 0]) // EFGH 11
    const [V1_K10, set_V1_K10] = useState([0, 0, 0, 0]) // EFGH 17
    const [V1_K12, set_V1_K12] = useState([0, 0, 0, 0]) // EFGH 18
    const [V1_K13, set_V1_K13] = useState([0, 0, 0, 0]) // EFGH 19
    useEffect(() => {
        setR0(0.693 / R1)
    }, [R1])
    useEffect(() => {
        setRM0((Q[7] + Q[11] * (age - 54)) * Math.pow(ABW / 67.3, -0.25))
    }, [age, ABW])
    useEffect(() => {
        setD0(0.693 / D1)
    }, [D1])
    useEffect(() => {
        setD_Dyck0(0.693 / D_Dyck1)
    }, [D_Dyck1])
    useEffect(() => {
        setR1(0.69314718 / (0.595 - 0.007 * (age - 40)))
    }, [age])
    useEffect(() => {
        setRM1(0.693 / RM0)
    }, [RM0])
    useEffect(() => {
        setV0([
            5.1 - 0.0201 * (age - 40) + 0.072 * (LBM - 55),
            Q[1] * ABW / 67.3,
            1.78 * BW / 70,
            7.9,
        ])
    }, [age, LBM, ABW, BW])
    useEffect(() => {
        set_V1_K12_K21([
            9.82 - 0.0811 * (age - 40) + 0.108 * (LBM - 55),
            Q[2] * (ABW / 67.3),
            (30.3 * BW / 70),
            13.8,
        ])
    }, [age, LBM, ABW, BW])
    useEffect(() => {
        set_V1_K13_K31([
            5.42,
            (Q[3] + Q[8] * (age - 54)) * (ABW / 67.3),
            52 * BW / 70,
            187,
        ])
    }, [age, ABW, BW])
    useEffect(() => {
        set_CL2_V2([
            V1_K12[0] / V1_K12_K21[0],
            V1_K12[1] / V1_K12_K21[1],
            V1_K12[2] / V1_K12_K21[2],
            V1_K12[3] / V1_K12_K21[3],
        ])
    }, [V1_K12, V1_K12_K21])
    useEffect(() => {
        set_CL3_V3([
            V1_K13[0] / V1_K13_K31[0],
            V1_K13[1] / V1_K13_K31[1],
            V1_K13[2] / V1_K13_K31[2],
            V1_K13[3] / V1_K13_K31[3],
        ])
    }, [V1_K13, V1_K13_K31])
    useEffect(() => {
        set_CL1_V1([
            V1_K10[0] / V0[0],
            V1_K10[1] / V0[1],
            V1_K10[2] / V0[2],
            V1_K10[3] / V0[3],
        ])
    }, [V1_K10, V0])
    useEffect(() => {
        set_CL2_V1([
            V1_K12[0] / V0[0],
            V1_K12[1] / V0[1],
            V1_K12[2] / V0[2],
            V1_K12[3] / V0[3],
        ])
    }, [V1_K12, V0])
    useEffect(() => {
        set_CL3_V1([
            V1_K13[0] / V0[0],
            V1_K13[1] / V0[1],
            V1_K13[2] / V0[2],
            V1_K13[3] / V0[3],
        ])
    }, [V1_K13, V0])
    useEffect(() => {
        set_V1_K10([
            2.6 - 0.0162 * (age - 40) + 0.0191 * (LBM - 55),
            Q[4] + Q[9] * gendor + Q[10] * (ASA_PS == 1 || ASA_PS == 2 ? 0 : 1) * Math.pow(ABW / 67.3, 0.75),
            0.686 * Math.pow(BW / 70, 0.75),
            -0.927 + 0.00791 * HT,
        ])
    }, [age, LBM, gendor, ASA_PS, ABW, BW, HT])
    useEffect(() => {
        set_V1_K12([
            2.05 - 0.0301 * (age - 40),
            Q[5] * Math.pow(ABW / 67.3, 0.75),
            2.98 * Math.pow((30.3 * BW / 70) / 30.3, 0.75),
            2.26,
        ])
    }, [age, ABW, BW])
    useEffect(() => {
        set_V1_K13([
            0.076 - 0.00113 * (age - 40),
            Q[6] * Math.pow(ABW / 67.3, 0.75),
            0.602 * Math.pow((52 * BW / 70) / 70, 0.75),
            1.99
        ])
    }, [age, ABW, BW])

    // AES Page
    const [Dose_RF, set_Dose_RF] = useState(0.3)
    const [hypnotics, setHypnotics] = useState(0)
    const [value1, setValue1] = useState(6)

    const [ECS_RF, set_ECS_RF] = useState(0)
    const [ECS_RZ, set_ECS_RZ] = useState(0)

    useEffect(() => {
        set_ECS_RF(BW / V1_K10[0] * Dose_RF)
    }, [BW, V1_K10, Dose_RF])

    useEffect(() => {
        if (hypnotics == 3)
            set_ECS_RZ(BW / (V1_K10[1] * 60) * value1)
        else
            set_ECS_RZ(0)
    }, [hypnotics, BW, V1_K10, value1])

    const [value2, setValue2] = useState(0)

    useEffect(() => {
        if (hypnotics == 3)
            setValue2(ECS_RZ)
        else
            setValue2(value1)
    }, [hypnotics, ECS_RZ, value1])

    const gamma = 3.46 // B37
    const hypn = 2.18 // D37

    const [C50_hypnotics, set_C50_hypnotics] = useState(
        {
            TOSS: {
                DES: 5.24,
                SEV: 1.47,
                Prop: 2.99,
                RZ: 0.7,
            },
            TOL: {
                DES: 0,
                SEV: 0,
                Prop: 8.46,
                RZ: 0,
            }
        }
    )
    useEffect(() => {
        const { TOSS, TOL } = C50_hypnotics
        const DES = TOSS.DES * TOL.Prop / TOSS.Prop
        const SEV = TOSS.SEV * TOL.Prop / TOSS.Prop
        const RZ = TOSS.RZ * TOL.Prop / TOSS.Prop

        set_C50_hypnotics(
            {
                TOSS: C50_hypnotics.TOSS,
                TOL: {
                    ...TOL,
                    DES,
                    SEV,
                    RZ,
                }
            }
        )
    }, [])

    const C50_opioid = {
        DES: 1.37,
        SEV: 1.37,
        Prop: 1.16,
        Remima: 1.16,
    }

    const Copioid = 8.27
    const Cop_C50op = {
        DES: Copioid / C50_opioid.DES,
        SEV: Copioid / C50_opioid.SEV,
        Prop: Copioid / C50_opioid.Prop,
        RZ: Copioid / C50_opioid.Remima,
    }

    const Arousal_in = {
        standard: 1,
        variable: 1.33,
    }
    const Arousal_out = {
        DES: Arousal_in.standard * (1 - Cop_C50op.DES / (1 + Cop_C50op.DES)),
        SEV: Arousal_in.standard * (1 - Cop_C50op.SEV / (1 + Cop_C50op.SEV)),
        Prop: Arousal_in.standard * (1 - Cop_C50op.Prop / (1 + Cop_C50op.Prop)),
        Remima: Arousal_in.standard * (1 - Cop_C50op.RZ / (1 + Cop_C50op.RZ)),
    }

    const cC50_hypmptics = {
        DES: C50_hypnotics.DES * Arousal_out.DES,
        SEV: C50_hypnotics.SEV * Arousal_out.SEV,
        Prop: C50_hypnotics.Prop * Arousal_out.Prop,
        RZ: C50_hypnotics.RZ * Arousal_out.Remima,
    }

    const [Chyp_cC50hyp, set_Chyp_cC50hyp] = useState({ DES: 0, SEV: 0, Prop: 0, RZ: 0 })

    useEffect(() => {
        set_Chyp_cC50hyp({
            DES: hypnotics == 0 ? value1 / cC50_hypmptics.DES : 0,
            SEV: hypnotics == 1 ? value1 / cC50_hypmptics.SEV : 0,
            Prop: hypnotics == 2 ? value1 / cC50_hypmptics.Prop : 0,
            RZ: hypnotics == 3 ? ECS_RZ / cC50_hypmptics.RZ : 0,
        })
    }, [hypnotics, value1, ECS_RZ])

    const [Pawake, set_Pawake] = useState([[], [], [], []])

    const [NSRI, set_NSRI] = useState([[], [], [], []])

    const [G105, set_G105] = useState(0)
    const [H105, set_H105] = useState(0)

    useEffect(() => {
        set_G105(Arousal_in.standard * (1 - ECS_RF / (C50_opioid.Prop + ECS_RF)))
        set_H105(Arousal_in.standard * (1 - ECS_RF / (C50_opioid.DES + ECS_RF)))
    }, [ECS_RF])

    useEffect(() => {
        const DES = value2 / (C50_hypnotics.TOSS.DES * H105)
        const SEV = value2 / (C50_hypnotics.TOSS.SEV * H105)
        const Prop = value2 / (C50_hypnotics.TOSS.Prop * G105)
        const RZ = value2 / (C50_hypnotics.TOSS.RZ * G105)
        set_Pawake([
            [DES, 1 - (Math.pow(DES, gamma) / (1 + Math.pow(DES, gamma)))],
            [SEV, 1 - (Math.pow(SEV, gamma) / (1 + Math.pow(SEV, gamma)))],
            [Prop, 1 - (Math.pow(Prop, gamma) / (1 + Math.pow(Prop, gamma)))],
            [RZ, 1 - (Math.pow(RZ, gamma) / (1 + Math.pow(RZ, gamma)))]
        ])
    }, [value2, C50_hypnotics, G105, H105])

    useEffect(() => {
        const DES = value2 / (C50_hypnotics.TOL.DES * H105)
        const SEV = value2 / (C50_hypnotics.TOL.SEV * H105)
        const Prop = value2 / (C50_hypnotics.TOL.Prop * G105)
        const RZ = value2 / (C50_hypnotics.TOL.RZ * G105)
        set_NSRI([
            [DES, 1 - (Math.pow(DES, gamma) / (1 + Math.pow(DES, gamma)))],
            [SEV, 1 - (Math.pow(SEV, gamma) / (1 + Math.pow(SEV, gamma)))],
            [Prop, 1 - (Math.pow(Prop, gamma) / (1 + Math.pow(Prop, gamma)))],
            [RZ, 1 - (Math.pow(RZ, gamma) / (1 + Math.pow(RZ, gamma)))]
        ])
    }, [value2, C50_hypnotics, G105, H105])

    const [P_Awake, set_P_Awake] = useState(0)
    const [P_CVR, set_P_CVR] = useState(0)

    useEffect(() => {
        set_P_Awake(Pawake[hypnotics][1] || 0)
    }, [hypnotics, Pawake])

    useEffect(() => {
        set_P_CVR(NSRI[hypnotics][1] || 0)
    }, [hypnotics, NSRI])

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        const newTableData = []

        for (let i = 0; i <= 200; i += 2) {
            const Copioid = i / 10
            const IVA_Arousal_out = Arousal_in.standard * (1 - Copioid / (C50_opioid.Prop + Copioid)) //G
            const VA_Arousal_out = Arousal_in.standard * (1 - Copioid / (C50_opioid.DES + Copioid)) //H
            const IVA_Arousal_out_STR = Arousal_in.variable * (1 - Copioid / (C50_opioid.Prop + Copioid)) // I
            const VOL_Arousal_out_STR = Arousal_in.variable * (1 - Copioid / (C50_opioid.DES + Copioid)) // J
            const Threshold = 0.5
            const Chyp = i / 10
            const Ptol_pop = Math.pow(Chyp / C50_hypnotics.TOSS.Prop, gamma) / Math.pow(1 + (Chyp / C50_hypnotics.TOSS.Prop), gamma)
            const Ptol_ind_curve = Math.pow(Chyp / (C50_hypnotics.TOSS.Prop * Arousal_out.Prop), gamma) / Math.pow(1 + (Chyp / (C50_hypnotics.TOSS.Prop * Arousal_out.Prop)), gamma)
            const Prop_TOL90 = Math.pow(9 * Math.pow(C50_hypnotics.TOL.Prop, gamma), 1 / gamma) * IVA_Arousal_out
            const Prop_TOL50 = Math.pow(5 * Math.pow(C50_hypnotics.TOL.Prop, gamma), 1 / gamma) * IVA_Arousal_out
            const Prop_TOSS90 = Math.pow(9 * Math.pow(C50_hypnotics.TOSS.Prop, gamma), 1 / gamma) * IVA_Arousal_out
            const Prop_TOSS50 = Math.pow(5 * Math.pow(C50_hypnotics.TOSS.Prop, gamma), 1 / gamma) * IVA_Arousal_out
            const RZ_TOL90 = Math.pow(9 * Math.pow(C50_hypnotics.TOL.RZ, gamma), 1 / gamma) * IVA_Arousal_out
            const RZ_TOL50 = Math.pow(5 * Math.pow(C50_hypnotics.TOL.RZ, gamma), 1 / gamma) * IVA_Arousal_out
            const RZ_TOSS90 = Math.pow(9 * Math.pow(C50_hypnotics.TOSS.RZ, gamma), 1 / gamma) * IVA_Arousal_out
            const RZ_TOSS50 = Math.pow(5 * Math.pow(C50_hypnotics.TOSS.RZ, gamma), 1 / gamma) * IVA_Arousal_out
            const DES_TOL90 = Math.pow(9 * Math.pow(C50_hypnotics.TOL.DES, gamma), 1 / gamma) * VA_Arousal_out
            const DES_TOL50 = Math.pow(5 * Math.pow(C50_hypnotics.TOL.DES, gamma), 1 / gamma) * VA_Arousal_out
            const DES_TOSS90 = Math.pow(9 * Math.pow(C50_hypnotics.TOSS.DES, gamma), 1 / gamma) * VA_Arousal_out
            const DES_TOSS50 = Math.pow(5 * Math.pow(C50_hypnotics.TOSS.DES, gamma), 1 / gamma) * IVA_Arousal_out
            const SEV_TOL90 = Math.pow(9 * Math.pow(C50_hypnotics.TOL.SEV, gamma), 1 / gamma) * VA_Arousal_out
            const SEV_TOL50 = Math.pow(5 * Math.pow(C50_hypnotics.TOL.SEV, gamma), 1 / gamma) * VA_Arousal_out
            const SEV_TOSS90 = Math.pow(9 * Math.pow(C50_hypnotics.TOSS.SEV, gamma), 1 / gamma) * VA_Arousal_out
            const SEV_TOSS50 = Math.pow(5 * Math.pow(C50_hypnotics.TOSS.SEV, gamma), 1 / gamma) * VA_Arousal_out
            let V_TOL90, V_TOL50, V_TOSS90, V_TOSS50
            switch (hypnotics) {
                case 0:
                    V_TOL90 = DES_TOL90
                    V_TOL50 = DES_TOL50
                    V_TOSS90 = DES_TOSS90
                    V_TOSS50 = DES_TOSS50
                    break;
                case 1:
                    V_TOL90 = SEV_TOL90
                    V_TOL50 = SEV_TOL50
                    V_TOSS90 = SEV_TOSS90
                    V_TOSS50 = SEV_TOSS50
                    break;
                case 2:
                    V_TOL90 = Prop_TOL90
                    V_TOL50 = Prop_TOL50
                    V_TOSS90 = Prop_TOSS90
                    V_TOSS50 = Prop_TOSS50
                    break;
                case 3:
                    V_TOL90 = RZ_TOL90
                    V_TOL50 = RZ_TOL50
                    V_TOSS90 = RZ_TOSS90
                    V_TOSS50 = RZ_TOSS50
                    break;
            }
            const Prop1 = Prop_TOL90 - V_TOL90
            const Prop2 = Prop_TOL50 - V_TOL50
            const Prop3 = Prop_TOSS90 - V_TOSS90
            const Prop4 = Prop_TOSS50 - V_TOSS50
            const RZ1 = RZ_TOL90 - V_TOL90
            const RZ2 = RZ_TOL50 - V_TOL50
            const RZ3 = RZ_TOSS90 - V_TOSS90
            const RZ4 = RZ_TOSS50 - V_TOSS50
            const DES1 = DES_TOL90 - V_TOL90
            const DES2 = DES_TOL50 - V_TOL50
            const DES3 = DES_TOSS90 - V_TOSS90
            const DES4 = DES_TOSS50 - V_TOSS50
            const SEV1 = SEV_TOL90 - V_TOL90
            const SEV2 = SEV_TOL50 - V_TOL50
            const SEV3 = SEV_TOSS90 - V_TOSS90
            const SEV4 = SEV_TOSS50 - V_TOSS50
            newTableData.push({ key: i, Copioid, IVA_Arousal_out, VA_Arousal_out, IVA_Arousal_out_STR, VOL_Arousal_out_STR, Threshold, Chyp, Ptol_pop, Ptol_ind_curve, Prop_TOL90, Prop_TOL50, Prop_TOSS90, Prop_TOSS50, RZ_TOL90, RZ_TOL50, RZ_TOSS90, RZ_TOSS90, DES_TOL90, DES_TOL50, DES_TOSS90, DES_TOSS50, SEV_TOL90, SEV_TOL50, SEV_TOSS90, SEV_TOSS50, V_TOL90, V_TOL50, V_TOSS90, V_TOSS50, Prop1, Prop2, Prop3, Prop4, RZ1, RZ2, RZ3, RZ4, DES1, DES2, DES3, DES4, SEV1, SEV2, SEV3, SEV4 })
        }

        setTableData(newTableData)
    }, [hypnotics, C50_hypnotics])

    const [showTableData, setShowTableData] = useState([])

    useEffect(() => {
        setShowTableData(tableData.map(row => {
            const newRow = {}
            _.map(row, (value, index) => {
                newRow[index] = (value || 0).toFixed(2)
            })
            return newRow
        }))
    }, [tableData])

    const [chartData, setChartData] = useState({ labels: [], datasets: [] })

    useEffect(() => {
        setChartData(
            {
                labels: [...Array.from({ length: 100 },
                    (_, i) => {
                        if (ECS_RF < i * 0.2)
                            return Number(i * 0.2).toFixed(1)
                        if (ECS_RF > (i + 1) * 0.2)
                            return Number(i * 0.2).toFixed(1)
                        return ECS_RF.toFixed(2)
                    }
                ), 8.06],
                datasets: [
                    {
                        label: `TOL90`,
                        data: tableData.map(v => [v.Copioid, v.V_TOL90]),
                        borderColor: 'rgb(128, 128, 128)',
                        backgroundColor: 'rgb(128, 128, 128, 0.5)',
                        pointBackgroundColor: 'transparent',
                        pointBorderColor: 'transparent'
                    },
                    {
                        label: `TOL50`,
                        data: tableData.map(v => [v.Copioid, v.V_TOL50]),
                        borderColor: 'rgb(235, 235, 53)',
                        backgroundColor: 'rgb(235, 235, 53, 0.5)',
                        pointBackgroundColor: 'transparent',
                        pointBorderColor: 'transparent'
                    },
                    {
                        label: `TOSS90`,
                        data: tableData.map(v => [v.Copioid, v.V_TOSS90]),
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgb(53, 162, 235, 0.5)',
                        pointBackgroundColor: 'transparent',
                        pointBorderColor: 'transparent'
                    },
                    {
                        label: `TOSS50`,
                        data: tableData.map(v => [v.Copioid, v.V_TOSS50]),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgb(255, 99, 132, 0.5)',
                        pointBackgroundColor: 'transparent',
                        pointBorderColor: 'transparent',
                    },
                    {
                        label: 'Anesthetic Effect',
                        data: [[ECS_RF.toFixed(2), Number(value2).toFixed(2)]],
                        borderColor: '#F00',
                        backgroundColor: '#F008',
                        pointBorderColor: '#F00',
                        pointBackgroundColor: '#F008',
                    },
                ],
            }
        )
    }, [tableData, ECS_RF, value2])

    const [name, setName] = useState('');

    const onSave = () => {
        query.post('/AES', {
            name,
            height: HT,
            weight: BW,
            age,
            gendor,
            ASA_PS,
            amount: Dose_RF,
            hypnotics,
            percent: value1
        })
    }

    const [queryParameters] = useSearchParams()

    useEffect(() => {
        const _id = queryParameters.get('_id');
        if (_id) {
            query.get('/AES/' + _id, ({ result }) => {
                setName(result.name);
                setHT(result.height);
                setBW(result.weight);
                setAge(result.age);
                setGendor(result.gendor);
                set_ASA_PS(result.ASA_PS);
                set_Dose_RF(result.amount);
                setHypnotics(result.hypnotics);
                setValue1(result.percent);
            })
        }
    }, [])

    const chartRef = useRef();

    const onDownload = () => {
        const canvas = chartRef.current.canvas;

        // Set the desired background color
        const backgroundColor = 'white';

        // Create a new canvas element with the desired background color
        const newCanvas = document.createElement('canvas');
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        const context = newCanvas.getContext('2d');
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, newCanvas.width, newCanvas.height);
        context.drawImage(canvas, 0, 0);

        // Convert the new canvas to a base64 image with the white background
        const base64Image = newCanvas.toDataURL('image/png');

        // Save the image with the white background
        saveAs(base64Image, `${name}.png`);

        const data = [];

        data[1] = [];
        data[2] = [];
        data[3] = [];
        data[4] = [];
        data[5] = [];
        data[6] = [];
        data[7] = [];
        data[8] = [];
        data[9] = [];

        data[1][1] = 'Patient';
        data[1][4] = 'Agents';

        data[2][1] = 'HT';
        data[3][1] = 'BW';
        data[4][1] = 'Age';
        data[5][1] = 'Gendor';
        data[6][1] = 'ASA-PS';

        data[2][2] = HT;
        data[3][2] = BW;
        data[4][2] = age;
        data[5][2] = gendor == 0 ? 'Male' : 'Female';
        data[6][2] = ASA_PS == 1 ? 'I' : ASA_PS == 2 ? 'II' : ASA_PS == 3 ? 'III' : ASA_PS == 4 ? 'IV' : 'V';

        data[2][3] = 'cm';
        data[3][3] = 'kg';

        data[2][4] = 'Dose(RF)'
        data[3][4] = 'Hypnotics';
        data[4][4] = label1[hypnotics];
        data[5][4] = label2[hypnotics];
        data[6][4] = 'ECS(RF)';
        data[7][4] = 'ECS(RZ)';
        data[8][4] = 'P Awake';
        data[9][4] = 'P CVR';

        data[2][5] = Dose_RF;
        data[3][5] = label1[hypnotics];
        data[4][5] = value1;
        data[5][5] = Number(value2).toFixed(2);
        data[6][5] = Number(ECS_RF).toFixed(2);
        data[7][5] = Number(ECS_RZ).toFixed(2);
        data[8][5] = Number(P_Awake).toFixed(2);
        data[9][5] = Number(P_CVR).toFixed(2);

        data[2][6] = 'μg/kg/min';
        data[4][6] = unit1[hypnotics];
        data[5][6] = unit2[hypnotics];
        data[6][6] = 'μg/mL';
        data[7][6] = 'μg/mL';
        data[8][6] = '%';
        data[9][6] = '%';

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        // Merge cells
        worksheet['!merges'] = [
            { s: { r: 1, c: 1 }, e: { r: 1, c: 3 } },
            { s: { r: 1, c: 4 }, e: { r: 1, c: 5 } },
        ];

        worksheet['!cols'] = [];

        for (let i = 0; i <= 6; i++) {
            worksheet['!cols'][i] = { wch: i == 0 ? 2 : 12 };
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, 'PKS');
        const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

        saveAs(new Blob([excelBuffer]), `${name}.xlsx`);
    };

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-0 md:pr-2">
                    <TitleCard title={"Patient"}>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">{t('name')}:</p>
                            <div className="w-5/6 flex gap-2">
                                <Input className="flex-grow" onChange={(e) => setName(e.target.value)} value={name} />
                                <button className={`btn btn-primary btn-sm flex-none ${name.length == 0 && 'btn-disabled'}`} onClick={onSave}>{t('save')}</button>
                                <button className={`btn btn-primary btn-sm flex-none ${name.length == 0 && 'btn-disabled'}`} onClick={onDownload}>{t('download')}</button>
                            </div>
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">HT:</p>
                            <InputNumber
                                className="w-5/6"
                                suffix={`cm`}
                                value={HT}
                                onChange={setHT}
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">BW:</p>
                            <InputNumber
                                className="w-5/6"
                                suffix={`kg`}
                                value={BW}
                                onChange={setBW}
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">Age:</p>
                            <InputNumber
                                className="w-5/6"
                                value={age}
                                onChange={setAge}
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">Gendor:</p>
                            <Radio.Group
                                className="w-5/6"
                                value={gendor}
                                onChange={(e) => setGendor(e.target.value)}
                            >
                                <Radio value={0}>Male</Radio>
                                <Radio value={1}>Female</Radio>
                            </Radio.Group>
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">ASA-PS:</p>
                            <Select
                                className="w-5/6"
                                options={ASA_PS_Options}
                                value={ASA_PS}
                                onChange={set_ASA_PS}
                            />
                        </div>
                    </TitleCard>
                </div>

                <div className="w-full md:w-1/2 pl-0 md:pl-2">
                    <TitleCard title={"Agent"}>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">Dose(RF):</p>
                            <InputNumber
                                className="w-5/6"
                                suffix={'μg/kg/min'}
                                value={Dose_RF}
                                onChange={(v) => set_Dose_RF(v)}
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">Hypnotics:</p>
                            <Select
                                className="w-5/6"
                                value={hypnotics}
                                options={Hypnotics_Options}
                                onChange={setHypnotics}
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">{label1[hypnotics]}:</p>
                            <InputNumber
                                className="w-5/6"
                                suffix={unit1[hypnotics]}
                                value={value1}
                                onChange={(v) => setValue1(v)}
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">{label2[hypnotics]}:</p>
                            <Input
                                className="w-5/6 border-none"
                                suffix={unit2[hypnotics]}
                                value={Number(value2).toFixed(2)}
                                readOnly
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">ECS(RF):</p>
                            <Input
                                className="w-5/6 border-none"
                                suffix={'μg/mL'}
                                value={ECS_RF.toFixed(2)}
                                readOnly
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">ECS(RZ):</p>
                            <Input
                                className="w-5/6 border-none"
                                suffix={'μg/mL'}
                                value={ECS_RZ.toFixed(2)}
                                readOnly
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">P<sub>Awake</sub>:</p>
                            <Input
                                className="w-5/6 border-none"
                                suffix={'%'}
                                value={(P_Awake * 100.0).toFixed(2)}
                                readOnly
                            />
                        </div>
                        <div className="flex w-full mt-4 items-center">
                            <p className="w-1/6 text-[12px]">P<sub>CVR</sub>:</p>
                            <Input
                                className="w-5/6 border-none"
                                suffix={'%'}
                                value={(P_CVR * 100.0).toFixed(2)}
                                readOnly
                            />
                        </div>
                    </TitleCard>
                </div>
            </div>
            <div className="flex flex-wrap items-start">
                {/* <TitleCard className="w-full" title={"Anesthetic Effect (Table)"}>
                    <Table dataSource={showTableData} bordered scroll={{ x: 'auto' }}>
                        <Column title='Copioid' dataIndex="Copioid" key="Copioid" />
                        <ColumnGroup title="Arousal out">
                            <Column title="IVA" dataIndex="IVA_Arousal_out" key="IVA_Arousal_out" />
                            <Column title="VA" dataIndex="IVA_Arousal_out" key="IVA_Arousal_out" />
                        </ColumnGroup>
                        <ColumnGroup title="Arousal out(Strong Simulation)">
                            <Column title="IVA" dataIndex="IVA_Arousal_out_STR" key="IVA_Arousal_out_STR" />
                            <Column title="VOL" dataIndex="VOL_Arousal_out_STR" key="VOL_Arousal_out_STR" />
                        </ColumnGroup>
                        <Column title='Threshold' dataIndex="Threshold" key="Threshold" />
                        <Column title='Chyp' dataIndex="Chyp" key="Chyp" />
                        <Column title='Ptol pop' dataIndex="Ptol_pop" key="Ptol_pop" />
                        <Column title='Ptol ind curve' dataIndex="Ptol_ind_curve" key="Ptol_ind_curve" />
                        <ColumnGroup title="Prop">
                            <Column title='TOL90' dataIndex="Prop_TOL90" key="Prop_TOL90" />
                            <Column title='TOL50' dataIndex="Prop_TOL50" key="Prop_TOL50" />
                            <Column title='TOSS90' dataIndex="Prop_TOSS90" key="Prop_TOSS90" />
                            <Column title='TOSS50' dataIndex="Prop_TOSS50" key="Prop_TOSS50" />
                        </ColumnGroup>
                        <ColumnGroup title="RZ">
                            <Column title='TOL90' dataIndex="RZ_TOL90" key="RZ_TOL90" />
                            <Column title='TOL50' dataIndex="RZ_TOL50" key="RZ_TOL50" />
                            <Column title='TOSS90' dataIndex="RZ_TOSS90" key="RZ_TOSS90" />
                            <Column title='TOSS50' dataIndex="RZ_TOSS90" key="RZ_TOSS90" />
                        </ColumnGroup>
                        <ColumnGroup title="DES">
                            <Column title='MAC90' dataIndex="DES_TOL90" key="DES_TOL90" />
                            <Column title='MAC50' dataIndex="DES_TOL50" key="DES_TOL50" />
                            <Column title='TOSS90' dataIndex="DES_TOSS90" key="DES_TOSS90" />
                            <Column title='TOSS50' dataIndex="DES_TOSS50" key="DES_TOSS50" />
                        </ColumnGroup>
                        <ColumnGroup title="SEV">
                            <Column title='MAC90' dataIndex="SEV_TOL90" key="SEV_TOL90" />
                            <Column title='MAC50' dataIndex="SEV_TOL50" key="SEV_TOL50" />
                            <Column title='TOSS90' dataIndex="SEV_TOSS90" key="SEV_TOSS90" />
                            <Column title='TOSS50' dataIndex="SEV_TOSS50" key="SEV_TOSS50" />
                        </ColumnGroup>
                        <ColumnGroup title={''} className="bg-yellow-200">
                            <Column title='TOL90' dataIndex="V_TOL90" key="V_TOL90" />
                            <Column title='TOL50' dataIndex="V_TOL50" key="V_TOL50" />
                            <Column title='TOSS90' dataIndex="V_TOSS90" key="V_TOSS90" />
                            <Column title='TOSS50' dataIndex="V_TOSS50" key="V_TOSS50" />
                        </ColumnGroup>
                        <ColumnGroup title="Prop">
                            <Column title='' dataIndex="Prop1" key="Prop1" />
                            <Column title='' dataIndex="Prop2" key="Prop2" />
                            <Column title='' dataIndex="Prop3" key="Prop3" />
                            <Column title='' dataIndex="Prop4" key="Prop4" />
                        </ColumnGroup>
                        <ColumnGroup title="RZ">
                            <Column title='' dataIndex="RZ1" key="RZ1" />
                            <Column title='' dataIndex="RZ2" key="RZ2" />
                            <Column title='' dataIndex="RZ3" key="RZ3" />
                            <Column title='' dataIndex="RZ4" key="RZ4" />
                        </ColumnGroup>
                        <ColumnGroup title="DES">
                            <Column title='' dataIndex="DES1" key="DES1" />
                            <Column title='' dataIndex="DES2" key="DES2" />
                            <Column title='' dataIndex="DES3" key="DES3" />
                            <Column title='' dataIndex="DES4" key="DES4" />
                        </ColumnGroup>
                        <ColumnGroup title="SEV">
                            <Column title='' dataIndex="SEV1" key="SEV1" />
                            <Column title='' dataIndex="SEV2" key="SEV2" />
                            <Column title='' dataIndex="SEV3" key="SEV3" />
                            <Column title='' dataIndex="SEV4" key="SEV4" />
                        </ColumnGroup>
                    </Table>
                </TitleCard> */}
                <TitleCard className="w-full" title={"Anesthetic Effect (Chart)"}>
                    <Line
                        ref={chartRef}
                        data={chartData}
                        className="h-64 md:h-auto"
                        options={{
                            y: {
                                beginAtZero: true,
                                max: value1 * 1.5,
                            },
                            x: {
                                beginAtZero: true,
                                max: (ECS_RF * 1.5) * 5,
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: (yDatapoint) => { return yDatapoint.formattedValue + unit2[hypnotics]; },
                                    }
                                },
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Remifentanil (ng/mL)',
                                        font: {
                                            weight: 'bold',
                                        }
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: `${label2[hypnotics]} (${unit2[hypnotics]})`,
                                        font: {
                                            weight: 'bold',
                                        }
                                    },
                                },
                            },
                        }} />
                </TitleCard>
            </div>
        </>
    )
}

export default Anesthetic