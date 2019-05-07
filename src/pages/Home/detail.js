import React, { PureComponent } from 'react'
import styles from './index.less'

// @connect(() => {})
class GoodsNumberDetail extends PureComponent {
    componentDidMount() {
        
    }

    render() {
        return (
            <div className={styles.main}>
                <div className={styles.detailList}>
                    最终的门店商品编号如下，例：0135191052301sdsh002000 <br/>
                    <br/>
                    第1-2位：01（代表商品大类编号，叶菜/根茎/净菜/半成品/等，支持100种大类）<br/>
                    第3-5位：351（代表spu编号，每个大类里最多支持1000种商品）<br/>
                    第6位：9（代表sku编号，基于每个spu下预留10个sku）<br/>

                    第7位：1（代表采购类型是场地采购，其他类型以后再加）<br/>

                    第8-11位：0523（代表采购日期）<br/>

                    第12-13位：01（代表物流公司编号，支持100家物流公司）<br/>

                    第14-15位：sd（代表发货地，山东首字母）<br/>

                    第16-17位：sh（代表收货地，上海首字母）<br/>

                    第18-20位：002（代表门店编号，支持1000家门店）<br/>

                    第21-22位：00（预留位）<br/>

                    第23位：0（校验位）
                </div>
            </div>
        )
    }
}

export default GoodsNumberDetail
