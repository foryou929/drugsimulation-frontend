import TitleCard from "../../components/Cards/TitleCard";

const ProductDescription = () => {
    return (
        <>
            <div className="flex flex-wrap">
                <TitleCard title={"製品説明"}>
                    <ul className="p-0 md:p-4">
                        <li className="ml-4 my-4">
                            <h4 className="font-bold text-lg">
                                1．製品概要
                            </h4>
                            <ul>
                                <li className="ml-4 my-2">
                                    ・本ソフトウエアは、薬物動態学（PK）と薬力学（PD）を用いて、薬物濃度と麻酔効果を算出するアプリケーションです。
                                </li>
                            </ul>
                        </li>
                        <li className="ml-4 my-4">
                            <h4 className="font-bold text-lg">
                                2．注意点
                            </h4>
                            <ul>
                                <li className="ml-4 my-2">・薬物動態シミュレーションや薬力学に組み込まれているコンパートメントモデルのパラメータは統計学的な値であり、計算される薬物濃度は必ずしも実測値と一致するわけではない。</li>
                                <li className="ml-4 my-2">・本アプリは、シミュレーションによってのみ使用するものであり、実際の麻酔管理に使用できる物ではない。実際の麻酔管理は、実施する麻酔科医が、生体モニタに表示される値や患者状態を把握し、判断して行う必要があり、従来の麻酔管理法と同様である必要がある。</li>
                                <li className="ml-4 my-2">・本アプリの使用はあくまでもユーザーの責任の範囲内で使用しなければならない。患者やその他にいかなる不利益が生じても,ソフトウエアの作者・制作者・販売者は一切の責任を負わない。</li>
                                <li className="ml-4 my-2">・すべてのソフトウエアは細心の注意を払って作成されているが,作者・制作者が確認できていないプログラムの不具合(バグ)が存在する可能性がある。現在の使用料は、通常価格の0-10%程度の使用料で提供しているため、バグによる製品の不十分による使用料の返金などに対応していない。</li>
                            </ul>
                        </li>
                        <li className="ml-4 my-4">
                            <h4 className="font-bold text-lg">
                                3．使用法
                            </h4>
                            <ul>
                                <li className="ml-4 my-2">
                                    <h5 className="font-bold text-lg">
                                        1）麻酔効果：Anesthetic Effect
                                    </h5>
                                    <ul>
                                        <li className="ml-4 my-2">
                                            <h6 className="font-bold">
                                                ① 概要
                                            </h6>
                                            <p className="ml-2">刺激（呼びかけと揺さぶり、喉頭展開）に対して、患者が反応（開眼、心血管反応）を生じる可能性を予測するアプリケーションである。</p>
                                        </li>
                                        <li className="ml-4 my-2">
                                            <h6 className="font-bold">
                                                ② 情報入力
                                            </h6>
                                            <p className="ml-2">Patient、Agentに必要情報を入力する</p>
                                        </li>
                                        <li className="ml-4 my-2">
                                            <h6 className="font-bold">
                                                ③ 表示
                                            </h6>
                                            <p className="ml-2">P<sub>awake</sub>: 呼びかけと揺さぶりに患者が開眼する確率</p>
                                            <p className="ml-2">P<sub>CVR</sub>: 喉頭展開程度の強い刺激に心血管反応が生じる確率</p>
                                            <p className="ml-2">Chart: 赤丸は麻酔効果、曲線は特定の麻酔効果を示すアイソボール</p>
                                        </li>
                                    </ul>
                                </li>
                                <li className="ml-4 my-2">
                                    <h5 className="font-bold text-lg">
                                        2）薬物動態シミュレーター：Pharmacokinetic simulator
                                    </h5>
                                    <ul>
                                        <li className="ml-4 my-2">
                                            <h6 className="font-bold">
                                                ① 概要
                                            </h6>
                                            <p className="ml-2">
                                                静脈麻酔薬・鎮静薬（レミマゾラム、デクスメデトミジン）、麻薬（フェンタニル、レミフェンタニル）の効果部位濃度を算出するアプリケーションである。
                                            </p>
                                        </li>
                                        <li className="ml-4 my-2">
                                            <h6 className="font-bold">
                                                ② 情報入力
                                            </h6>
                                            <p className="ml-2">
                                                Patient、Agentに必要情報を入力する
                                            </p>
                                        </li>
                                        <li className="ml-4 my-2">
                                            <h6 className="font-bold">
                                                ③ 表示
                                            </h6>
                                            <p className="ml-2">
                                                Chart: 曲線がそれぞれの薬物の効果部位濃度を示す。曲線をクリックすると、計算値が表示される。
                                            </p>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li >
                        <li className="ml-4 my-4">
                            <h4 className="font-bold text-lg">
                                4．問いあわせ
                            </h4>
                            <p className="ml-2">
                                以下のフォームに入力して下さい。現在の使用料は、通常価格の0 - 10 % で提供しているため、回答遅延、回答不可の可能性があることをご理解下さいませ。
                            </p>
                            <ul>
                                <li className="ml-4 my-2">・お名前</li>
                                <li className="ml-4 my-2">・Emailアドレス</li>
                                <li className="ml-4 my-2">・件名</li>
                                <li className="ml-4 my-2">・問合せ内容</li>
                            </ul>
                        </li>
                    </ul >
                </TitleCard >
            </div >
        </>
    );
}

export default ProductDescription;