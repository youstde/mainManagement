import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

// 上传
const upload = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 34">
        <path
            fill="currentColor"
            d="M34.13,30.22c4.35,0,7.87-3.8,7.87-8.5h0c0-4.69-3.5-8.5-7.1-8.46C34,5.69,28.07,0,21,0,13.27,0,7,7.56,7.16,13.26A8.27,8.27,0,0,0,0,21.72c0,4.69,3.52,8.5,7.87,8.5h4.38a1.89,1.89,0,0,0,0-3.78H7.87a4.59,4.59,0,0,1-4.22-4.89A4.56,4.56,0,0,1,7.87,17H10.5V15.11C10.5,8.85,15.2,3.78,21,3.78S31.5,8.85,31.5,15.11V17h2.63a4.59,4.59,0,0,1,4.22,4.89,4.56,4.56,0,0,1-4.22,4.56H29.75a1.89,1.89,0,0,0,0,3.78h4.37ZM19.68,15.75a1.66,1.66,0,0,1,2.47-.17l.09.09,5.25,5.67a2,2,0,0,1,0,2.67A1.66,1.66,0,0,1,25,24l-2.26-2.46V32.12A1.82,1.82,0,0,1,21,34h0a1.83,1.83,0,0,1-1.75-1.88V21.54L17,24a1.66,1.66,0,0,1-2.48,0,2,2,0,0,1,0-2.67h0l5.17-5.58Z"
        />
    </svg>
)

// 设置
const setting = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.48 23.79">
        <path
            fill="currentColor"
            d="M24.79,9.08a4.79,4.79,0,0,1-3.11-2.27A4.63,4.63,0,0,1,21.25,3a.59.59,0,0,0-.19-.63A12.76,12.76,0,0,0,17,0a.61.61,0,0,0-.65.15,4.84,4.84,0,0,1-3.6,1.54A4.84,4.84,0,0,1,9.2.23.61.61,0,0,0,8.49,0,12.71,12.71,0,0,0,4.41,2.43a.59.59,0,0,0-.19.63A4.63,4.63,0,0,1,3.8,6.81,4.79,4.79,0,0,1,.69,9.08a.59.59,0,0,0-.46.47,12.08,12.08,0,0,0,0,4.69.59.59,0,0,0,.46.47A4.79,4.79,0,0,1,3.8,17a4.63,4.63,0,0,1,.42,3.77.59.59,0,0,0,.19.63,12.76,12.76,0,0,0,4.08,2.37h.2a.61.61,0,0,0,.44-.19A4.89,4.89,0,0,1,16,23.37l.18.18a.61.61,0,0,0,.76.19,12.73,12.73,0,0,0,4.15-2.35.59.59,0,0,0,.19-.63A4.63,4.63,0,0,1,21.68,17a4.79,4.79,0,0,1,3.11-2.25.59.59,0,0,0,.46-.47,12,12,0,0,0,0-4.69.61.61,0,0,0-.46-.47Zm-1.14,4.5a5.81,5.81,0,0,0-3.4,2.61,5.63,5.63,0,0,0-.58,4.16,11,11,0,0,1-3,1.69,5.77,5.77,0,0,0-4-1.69,5.88,5.88,0,0,0-4,1.69,11,11,0,0,1-3-1.69,5.56,5.56,0,0,0-.63-4.15,5.81,5.81,0,0,0-3.35-2.62,10.25,10.25,0,0,1,0-3.38,5.81,5.81,0,0,0,3.4-2.61A5.64,5.64,0,0,0,5.8,3.43a11,11,0,0,1,3-1.69,5.88,5.88,0,0,0,4,1.54,5.8,5.8,0,0,0,4-1.54,11,11,0,0,1,3,1.69,5.63,5.63,0,0,0,.61,4.15,5.81,5.81,0,0,0,3.4,2.61,10.27,10.27,0,0,1,0,3.38l0,0Z"
        />
        <path
            fill="currentColor"
            d="M12.74,6.81a5.07,5.07,0,1,0,0,10.15h0a5.07,5.07,0,1,0,0-10.15Zm0,8.46a3.39,3.39,0,1,1,2.4-1,3.39,3.39,0,0,1-2.4,1Z"
        />
    </svg>
)

// 通知
const notice = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.52 25.06">
        <path
            fill="currentColor"
            d="M18.52,16.5l-.45-.55s0,0,0,0V9.7a7.08,7.08,0,0,0-2.21-5.14,7.45,7.45,0,0,0-2.55-1.61.51.51,0,0,0,0-.16,2.75,2.75,0,1,0-5.51,0,.44.44,0,0,0,0,.13,7.47,7.47,0,0,0-2.6,1.64A7.09,7.09,0,0,0,3.05,9.7v6.22l-.47.58C1.17,18.22,0,19.72,0,20.58a1.33,1.33,0,0,0,.41,1,1.55,1.55,0,0,0,1,.37H7a3.53,3.53,0,0,0,7,0h5.63a1.53,1.53,0,0,0,1-.37,1.33,1.33,0,0,0,.41-1c0-.87-1.17-2.36-2.58-4.08ZM10.59,1a1.74,1.74,0,0,1,1.74,1.6,7.88,7.88,0,0,0-3.48,0A1.76,1.76,0,0,1,10.59,1Zm-.06,23A2.52,2.52,0,0,1,8.05,22h5A2.52,2.52,0,0,1,10.54,24ZM20,20.86a.6.6,0,0,1-.35.11H1.45a.58.58,0,0,1-.35-.1S1,20.78,1,20.57s0-.39.78-1.44c.49-.68,1.09-1.41,1.57-2L4,16.4a.49.49,0,0,0,.09-.4.56.56,0,0,0,0-.1V9.7a6.39,6.39,0,0,1,6.5-6.26,6.39,6.39,0,0,1,6.5,6.26v6.19a.31.31,0,0,0,0,.06.51.51,0,0,0,.08.45l.6.74c.48.59,1.08,1.31,1.57,2,.75,1,.78,1.38.78,1.43,0,.21-.07.27-.1.29Z"
        />
        <path
            fill="currentColor"
            d="M18.94,16.46l-.45-.55s0,0,0,0V9.66a7.08,7.08,0,0,0-2.21-5.14,7.45,7.45,0,0,0-2.55-1.61.51.51,0,0,0,0-.16,2.75,2.75,0,0,0-5.51,0,.44.44,0,0,0,0,.13,7.47,7.47,0,0,0-2.6,1.64A7.09,7.09,0,0,0,3.47,9.66v6.22L3,16.46C1.59,18.18.42,19.68.42,20.54a1.33,1.33,0,0,0,.41,1,1.55,1.55,0,0,0,1,.37h5.6a3.53,3.53,0,0,0,7,0h5.63a1.53,1.53,0,0,0,1-.37,1.33,1.33,0,0,0,.41-1c0-.87-1.17-2.36-2.58-4.08ZM11,1a1.74,1.74,0,0,1,1.74,1.6,7.88,7.88,0,0,0-3.48,0A1.76,1.76,0,0,1,11,1ZM11,24a2.52,2.52,0,0,1-2.48-2.09h5A2.52,2.52,0,0,1,11,24Zm9.48-3.19a.6.6,0,0,1-.35.11H1.87a.58.58,0,0,1-.35-.1s-.09-.08-.09-.29,0-.39.78-1.44c.49-.68,1.09-1.41,1.57-2l.6-.74a.49.49,0,0,0,.09-.4.56.56,0,0,0,0-.1V9.66A6.39,6.39,0,0,1,11,3.41a6.39,6.39,0,0,1,6.5,6.26v6.19a.31.31,0,0,0,0,.06.51.51,0,0,0,.08.45l.6.74c.48.59,1.08,1.31,1.57,2,.75,1,.78,1.38.78,1.43,0,.2-.07.27-.09.29Z"
        />
    </svg>
)

// 支付方式 锌贝壳
const payZnbell = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.96 86.69">
        <path
            fill="currentColor"
            d="M48.48,85.45a2.56,2.56,0,0,1-2.55-2.37c-2-10.17-4.44-20.07-6.59-28.81C34.58,35,30.82,19.7,33.58,10.45,35.41,4.3,41.55,0,48.5,0S61.59,4.3,63.43,10.45c2.75,9.24-1,24.45-5.77,43.71C55.49,62.93,53,72.87,51,83.08a2.56,2.56,0,0,1-2.55,2.37Zm0-80.34c-4.64,0-8.86,2.86-10,6.8C36.11,19.83,39.91,35.22,44.3,53c1.34,5.44,2.79,11.34,4.18,17.47,1.4-6.18,2.87-12.1,4.22-17.58,4.39-17.77,8.18-33.12,5.83-41-1.17-3.94-5.39-6.8-10-6.8Z"
        />
        <path
            fill="currentColor"
            d="M48.48,85.37a2.55,2.55,0,0,1-1.93-.88,204.44,204.44,0,0,1-20.43-29C20.75,46.24,14.33,33.32,14.2,24.1,14.06,14.62,18.39,10.28,22,8.31a13.44,13.44,0,0,1,6.44-1.65,14.5,14.5,0,0,1,8.94,3.19,2.55,2.55,0,0,1,.89,2.62c-2,8.08,1.68,23.14,6,40.57C46.48,61.91,49,72,51,82.32a2.55,2.55,0,0,1-2.5,3Zm-20-73.6a8.38,8.38,0,0,0-4,1C20.91,14.72,19.22,18.39,19.3,24c.16,11.6,12.94,33.48,24.47,48.84-1.46-6.54-3-12.83-4.44-18.61C35,36.58,31.48,22.38,33,13A9.16,9.16,0,0,0,28.49,11.76Z"
        />
        <path
            fill="currentColor"
            d="M48.48,85.37a2.56,2.56,0,0,1-.64-.08c-7-1.81-16.89-7.8-26.49-16S4.59,52.5,2.08,46.27C-.26,40.48.18,35.29,3.4,30.85a11,11,0,0,1,9.17-4.59,13.79,13.79,0,0,1,6.2,1.51,2.55,2.55,0,0,1,1.31,1.67c3.82,15.81,20.36,40.2,30.33,51.7a2.55,2.55,0,0,1-1.93,4.23Zm-35.91-54a6,6,0,0,0-5,2.47c-2.15,3-2.39,6.41-.73,10.51,2.19,5.42,9,13.48,17.86,21a100.44,100.44,0,0,0,15.4,11c-4-5.25-8-11.19-11.59-17-4.62-7.52-10.52-18.25-13-27.52A8.56,8.56,0,0,0,12.57,31.37Z"
        />
        <path
            fill="currentColor"
            d="M48.44,85.37c-3.4,0-13.66-2.91-21.58-5.65-6.74-2.33-18.73-6.9-23.39-11.38-3.7-3.55-4.58-9.35-2-12.91a8.32,8.32,0,0,1,7-3.53,11.48,11.48,0,0,1,2.54.3,2.55,2.55,0,0,1,1.41.87,108.23,108.23,0,0,0,18,17c7.17,5.39,13.8,9,18.68,10.31a2.55,2.55,0,0,1-.62,5h-.06ZM8.46,57a3.23,3.23,0,0,0-2.84,1.43c-1,1.35-.6,4.3,1.4,6.22,3.37,3.25,12.44,7.08,21.28,10.13l-.92-.68A115,115,0,0,1,9.07,57a5.59,5.59,0,0,0-.61,0Z"
        />
        <path
            fill="currentColor"
            d="M34.7,86.69h0c-4.08,0-6.92-.35-8.69-1.06a6.2,6.2,0,0,1-3.93-6.71,5.4,5.4,0,0,1,4.08-4.42,2.55,2.55,0,0,1,1.45.07C38,78.23,46.54,80.26,48.44,80.26h0a2.56,2.56,0,0,1,1,4.91c-2.07.85-9.63,1.52-14.75,1.52ZM27.11,79.8l0,.11a1.35,1.35,0,0,0,.84,1,14.66,14.66,0,0,0,4.46.64Q29.74,80.71,27.11,79.8Z"
        />
        <path
            fill="currentColor"
            d="M48.48,85.37a2.55,2.55,0,0,1-2.5-3C48,72,50.48,61.91,52.66,53c4.3-17.43,8-32.49,6-40.58a2.55,2.55,0,0,1,.89-2.62,14.51,14.51,0,0,1,8.94-3.19,13.44,13.44,0,0,1,6.44,1.65c3.65,2,8,6.31,7.84,15.79-.13,9.21-6.56,22.14-11.92,31.36a204.39,204.39,0,0,1-20.43,29,2.55,2.55,0,0,1-1.93.88ZM64,13c1.52,9.38-2,23.58-6.34,41.27-1.42,5.78-3,12.07-4.44,18.61C64.72,57.51,77.49,35.63,77.65,24c.08-5.63-1.61-9.31-5.16-11.23a8.39,8.39,0,0,0-4-1A9.15,9.15,0,0,0,64,13Z"
        />
        <path
            fill="currentColor"
            d="M48.48,85.37a2.55,2.55,0,0,1-1.93-4.23c10-11.5,26.51-35.89,30.33-51.7a2.55,2.55,0,0,1,1.31-1.67,13.79,13.79,0,0,1,6.2-1.51,11,11,0,0,1,9.17,4.59c3.22,4.45,3.66,9.63,1.32,15.42-2.52,6.23-9.72,14.83-19.27,23s-19.51,14.21-26.49,16a2.56,2.56,0,0,1-.64.08ZM81.53,31.88c-2.52,9.27-8.43,20-13,27.52-3.58,5.82-7.63,11.76-11.59,17a100.43,100.43,0,0,0,15.4-11c8.82-7.55,15.67-15.61,17.86-21,1.66-4.1,1.42-7.54-.73-10.51a6,6,0,0,0-5-2.47A8.55,8.55,0,0,0,81.53,31.88Z"
        />
        <path
            fill="currentColor"
            d="M48.52,85.37h-.06a2.55,2.55,0,0,1-.62-5C52.71,79.08,59.34,75.42,66.51,70a108.24,108.24,0,0,0,18-17A2.55,2.55,0,0,1,86,52.19a11.48,11.48,0,0,1,2.54-.3,8.32,8.32,0,0,1,7,3.53c2.6,3.57,1.71,9.36-2,12.91-4.66,4.48-16.65,9.05-23.39,11.38-7.92,2.74-18.18,5.65-21.58,5.65ZM87.89,57A115,115,0,0,1,69.58,74.11l-.92.68c8.84-3.05,17.91-6.89,21.28-10.13,2-1.92,2.38-4.87,1.4-6.22A3.23,3.23,0,0,0,88.5,57a5.49,5.49,0,0,0-.61,0Z"
        />
        <path
            fill="currentColor"
            d="M62.26,86.69c-5.12,0-12.68-.66-14.75-1.52a2.55,2.55,0,1,1,1-4.91c1.91,0,10.42-2,20.85-5.69a2.55,2.55,0,0,1,1.45-.07,5.4,5.4,0,0,1,4.08,4.42,6.2,6.2,0,0,1-3.93,6.71c-1.77.72-4.61,1.06-8.69,1.06Zm7.59-6.89q-2.63.9-5.28,1.73A14.66,14.66,0,0,0,69,80.89a1.34,1.34,0,0,0,.84-1Z"
        />
    </svg>
)
// 支付方式 信用额度
const payBalance = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.69 86.65">
        <path
            fill="currentColor"
            d="M20.1,16.14a1.82,1.82,0,0,1,3,1.36V60.93a1.77,1.77,0,0,1-1.78,1.79h-.11a1.77,1.77,0,0,1-1.79-1.79V21.68c-1.13,1-2.22,2.12-3.35,3.15a1.83,1.83,0,0,1-2.49-.05,1.89,1.89,0,0,1-.54-1.36,1.63,1.63,0,0,1,.59-1.25l6.44-6ZM59.69,17.5a1.8,1.8,0,0,1,1.78,1.79v.11a1.8,1.8,0,0,1-1.78,1.79H28.81A1.81,1.81,0,0,1,27,19.4v-.11a1.8,1.8,0,0,1,1.79-1.79H42.44V15.33a1.77,1.77,0,0,1,1.79-1.79h.05a1.77,1.77,0,0,1,1.78,1.79V17.5Zm-31.8,31a6.25,6.25,0,0,1,.43-2.23,5.85,5.85,0,0,1,5.3-3.58H54.87a5.68,5.68,0,0,1,4.06,1.74,5.81,5.81,0,0,1,1.73,4.07V57a5.73,5.73,0,0,1-3.57,5.32,4.92,4.92,0,0,1-2.22.43H33.62A5.75,5.75,0,0,1,27.89,57V48.49ZM58.44,26.35a1.8,1.8,0,0,1,1.79,1.79v.11A1.84,1.84,0,0,1,58.44,30H30.05a1.84,1.84,0,0,1-1.78-1.79v-.11a1.8,1.8,0,0,1,1.78-1.79Zm0,8.68a1.84,1.84,0,0,1,1.79,1.79v.11a1.8,1.8,0,0,1-1.79,1.79H30.05a1.8,1.8,0,0,1-1.78-1.79v-.11A1.84,1.84,0,0,1,30.05,35ZM31.56,57a2,2,0,0,0,2.06,2.12H54.87A2,2,0,0,0,57,57V48.49a2,2,0,0,0-2.11-2.06H33.62a2,2,0,0,0-2.06,2.06V57Z"
        />
        <path
            fill="currentColor"
            d="M9.68,76a6.19,6.19,0,0,1-5.5-6.15V10.06a6,6,0,0,1,6.14-5.93h89.81a6.19,6.19,0,0,1,6.39,5.93v43A31.65,31.65,0,0,1,110.71,57V8c0-4.56-4-8-8.58-8H8.23A8,8,0,0,0,0,8v64a8.3,8.3,0,0,0,7.38,8.25h66A31.19,31.19,0,0,1,72.56,76H9.68Z"
        />
        <path
            fill="currentColor"
            d="M111.11,83.24l-8.7-8.76a15.85,15.85,0,1,0-12.53,6.18,15.73,15.73,0,0,0,9.73-3.35l8.7,8.76a2,2,0,0,0,2.8,0,2,2,0,0,0,0-2.82ZM78,64.69a11.9,11.9,0,1,1,11.9,12,12,12,0,0,1-11.9-12Z"
        />
    </svg>
)

/**
 * 菜单中使用的icon
 */
// 企业认证
const certification = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path
            fill="currentColor"
            d="M16.62,2.65h-.75a11.25,11.25,0,0,1-3.45-.71,15.56,15.56,0,0,1-3-1.5L9,.1,8.54.42a15.42,15.42,0,0,1-3,1.5,11.19,11.19,0,0,1-3.45.71H1.38V10c0,3.69,5,7.6,7.62,7.6s7.62-3.9,7.62-7.6V2.65ZM9,16.51C6.79,16.51,2.47,13,2.47,10V3.71A12.45,12.45,0,0,0,6,2.94,17.66,17.66,0,0,0,9,1.43a17.08,17.08,0,0,0,3,1.51,12.47,12.47,0,0,0,3.51.77V10C15.53,13,11.21,16.51,9,16.51Z"
        />
        <path
            fill="currentColor"
            d="M13.55,9.57l-2.92,2.92L9.4,11.1a.55.55,0,0,0-.82.72l1.61,1.82a.54.54,0,0,0,.39.18h0a.54.54,0,0,0,.39-.16l3.33-3.33a.55.55,0,0,0-.77-.78Z"
        />
        <path
            fill="currentColor"
            d="M10.56,10.56a10.29,10.29,0,0,1,.81-.73,4,4,0,0,0-1.31-.92A2.52,2.52,0,1,0,7,8.91,3.92,3.92,0,0,0,4.61,12.5a.55.55,0,0,0,1.09,0A2.82,2.82,0,0,1,8.52,9.68a2.79,2.79,0,0,1,2,.88Zm-2-5.07A1.43,1.43,0,1,1,7.09,6.92,1.44,1.44,0,0,1,8.52,5.49Z"
        />
    </svg>
)
// 资产管理
const assets = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path
            fill="currentColor"
            d="M8.5,2A7.5,7.5,0,1,1,1,9.5,7.51,7.51,0,0,1,8.5,2m0-1A8.5,8.5,0,1,0,17,9.5,8.5,8.5,0,0,0,8.5,1Z"
        />
        <path fill="currentColor" d="M18,9H9V0a9,9,0,0,1,9,9Z" />
    </svg>
)
// 动帐记录
const reconcile = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path
            fill="currentColor"
            d="M9.71,7.88V9.16h2.12a.57.57,0,0,1,.58.56s0,0,0,0a.57.57,0,0,1-.56.58H9.71V12.8a.57.57,0,0,1-.56.58h0a.57.57,0,0,1-.58-.56s0,0,0,0V10.29H6.47a.57.57,0,0,1-.59-.56s0,0,0,0a.57.57,0,0,1,.56-.58h2.1V7.85h-2a.58.58,0,0,1-.58-.62.61.61,0,0,1,.58-.62H7.82L6.51,5.29a.52.52,0,0,1,0-.74l0,0a.53.53,0,0,1,.77,0L9.13,6.39,11,4.53a.53.53,0,0,1,.75,0l0,0a.52.52,0,0,1,0,.74l0,0L10.45,6.61h1.38a.58.58,0,0,1,.58.62.61.61,0,0,1-.58.62H9.71v0Z"
        />
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.72,11.46A8,8,0,0,1,1.15,9"
        />
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1.9,5.49A8,8,0,0,1,17.15,8.88v0"
        />
        <path
            fill="currentColor"
            d="M.88,9l.51,2.58a.43.43,0,0,0,.57.35l1.89-.5a.43.43,0,0,0,0-.67L1.5,8.67A.35.35,0,0,0,.88,9Z"
        />
        <path
            fill="currentColor"
            d="M17.42,9l-.51-2.58A.43.43,0,0,0,16.33,6l-1.89.5a.43.43,0,0,0,0,.67l2.4,2.08A.35.35,0,0,0,17.42,9Z"
        />
    </svg>
)

// 应付
const payable = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path
            fill="currentColor"
            d="M.46,18.07A.46.46,0,0,1,0,17.61H0V11.86a.47.47,0,0,1,.16-.38L4.55,7.7a.46.46,0,1,1,.61.7L.92,12.07v5.54A.46.46,0,0,1,.46,18.07Z"
        />
        <path
            fill="currentColor"
            d="M2.74,17.78A.46.46,0,0,1,2.46,17s3.4-2.68,4.29-3.57c.64-.64.48-1,0-1.52a1,1,0,0,0-.59-.29.47.47,0,0,0-.36.1L4.45,13,3.07,14.39a.46.46,0,0,1-.65-.65L3.8,12.37,5.15,11a1.37,1.37,0,0,1,1.1-.36,1.88,1.88,0,0,1,1.16.56,1.79,1.79,0,0,1,0,2.82C6.48,15,3.18,17.58,3,17.69A.49.49,0,0,1,2.74,17.78Z"
        />
        <path
            fill="currentColor"
            d="M16.61,17.76H5.82a1.39,1.39,0,0,1-1.39-1.39h0a.46.46,0,1,1,.92,0,.46.46,0,0,0,.46.46h10.8a.46.46,0,0,0,.46-.46V1.87a.46.46,0,0,0-.46-.46H5.82a.46.46,0,0,0-.46.46h0v10a.46.46,0,1,1-.92,0v-10A1.39,1.39,0,0,1,5.82.48h10.8A1.39,1.39,0,0,1,18,1.87v14.5A1.39,1.39,0,0,1,16.61,17.76Z"
        />
        <path
            fill="currentColor"
            d="M9.44,2.93H6.71v.79H9.44V2.94ZM4.89,4.82H17.53v.51H4.89Zm8.53,6.79H9a.5.5,0,0,1,0-1h4.41a.5.5,0,1,1,0,1Zm0,1.8H9a.5.5,0,0,1,0-1h4.41a.5.5,0,0,1,0,1Z"
        />
        <path
            fill="currentColor"
            d="M11.21,14.94a.47.47,0,0,1-.48-.46s0,0,0,0V10a.5.5,0,0,1,1,0v4.52a.47.47,0,0,1-.48.46Z"
        />
        <path
            fill="currentColor"
            d="M11.22,10.48a.48.48,0,0,1-.33-.13L9.36,8.82A.48.48,0,1,1,10,8.14l1.54,1.49a.48.48,0,0,1,0,.67A.46.46,0,0,1,11.22,10.48Z"
        />
        <path
            fill="currentColor"
            d="M11.22,10.48a.48.48,0,0,1-.33-.82l1.54-1.49a.48.48,0,0,1,.66.68l-1.54,1.46A.46.46,0,0,1,11.22,10.48Z"
        />
    </svg>
)
// 应收
const receivable = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path
            fill="currentColor"
            d="M8.15,8.29a.53.53,0,0,1-.41-.24L5.86,5.79a.53.53,0,1,1,.8-.64L8.55,7.41a.53.53,0,0,1-.41.88Z"
        />
        <path
            fill="currentColor"
            d="M8.55,8.29a.53.53,0,0,1-.41-.88L10,5.15a.53.53,0,0,1,.81.69h0L9,8.06A.53.53,0,0,1,8.55,8.29Z"
        />
        <path
            fill="currentColor"
            d="M10.73,8.62H5.91a.53.53,0,0,1,0-1.07h4.82a.53.53,0,1,1,0,1.07Zm0,1.89H5.91a.53.53,0,0,1,0-1.07h4.82a.53.53,0,1,1,0,1.07Z"
        />
        <path
            fill="currentColor"
            d="M8.31,12.47h0a.53.53,0,0,1-.53-.53h0V8a.53.53,0,0,1,.53-.53h0A.53.53,0,0,1,8.84,8h0v4A.53.53,0,0,1,8.31,12.47Zm6,5a.53.53,0,0,1-.32-.11l-2.32-1.77a.54.54,0,0,1,.65-.85h0l1.89,1.47,2.83-3.17a.53.53,0,0,1,.8.71l-3.11,3.54A.53.53,0,0,1,14.34,17.49Z"
        />
        <path
            fill="currentColor"
            d="M11,17.49H2.21A1.21,1.21,0,0,1,1,16.3V1.71A1.21,1.21,0,0,1,2.21.51H14.48a1.21,1.21,0,0,1,1.21,1.21V13.29H14.57V1.71a.14.14,0,0,0-.14-.14H2.16A.14.14,0,0,0,2,1.71V16.3a.14.14,0,0,0,.14.14H11Z"
        />
    </svg>
)
// 到期承兑
const accept = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            d="M11.33,16.14a7.5,7.5,0,1,1,4.62-3.51"
        />
        <rect fill="currentColor" x="8.51" y="4.5" width="0.63" height="5" rx="0.31" ry="0.31" />
        <rect
            fill="currentColor"
            x="10.39"
            y="7"
            width="0.63"
            height="4.38"
            rx="0.31"
            ry="0.31"
            transform="translate(19.89 -1.51) rotate(90)"
        />
        <path
            fill="currentColor"
            d="M13.57,10.5A3.44,3.44,0,1,0,17,13.94,3.44,3.44,0,0,0,13.57,10.5ZM12,15.12a2.48,2.48,0,0,0,.74-1.62h-.62v-.24H13v.24a2.76,2.76,0,0,1-.8,1.83Zm2.5-.27h-.62v.31q0,.48-.46.48h-.54l-.07-.29.58,0c.16,0,.23-.08.23-.24v-.28H13v-.24h.63v-.33H13.1V14h.49v-.32h-.45v-.24h.45v-.36l.71-.38H12.41v-.24h2.46v.25l-1,.53v.21h.45v.24h-.45V14h.48v.24h-.48v.33h.63Zm.72.54a3.14,3.14,0,0,1-.76-2.15l.2,0a3.51,3.51,0,0,0,0,.46l.55-.46.18.21-.67.53a2.6,2.6,0,0,0,.71,1.24Z"
        />
    </svg>
)
// 融资管理
const finance = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <rect fill="currentColor" x="6.03" y="0.34" width="0.85" height="3.28" />
        <rect fill="currentColor" x="6.03" y="13.96" width="0.85" height="3.28" />
        <path
            fill="currentColor"
            d="M9.08,13.85a3.38,3.38,0,0,1,1.76-3,3,3,0,0,0-.66-1.31,7.57,7.57,0,0,0-3-1.7A9,9,0,0,1,5,6.76a1.54,1.54,0,0,1-.5-1.22,1.5,1.5,0,0,1,.7-1.28A3.12,3.12,0,0,1,7,3.77a6,6,0,0,1,3.34,1V2.47a8.21,8.21,0,0,0-3.11-.58A6.12,6.12,0,0,0,3.57,2.94a3.27,3.27,0,0,0-1.48,2.8,3.35,3.35,0,0,0,.65,2.08A6.89,6.89,0,0,0,5.58,9.56,9.33,9.33,0,0,1,8,10.73,1.56,1.56,0,0,1,8.58,12q0,1.78-2.72,1.78A6.34,6.34,0,0,1,2.08,12.5v2.37a7.77,7.77,0,0,0,3.56.77,6.68,6.68,0,0,0,3.58-.89A3.36,3.36,0,0,1,9.08,13.85Z"
        />
        <path
            fill="currentColor"
            d="M13.08,10.85a3.39,3.39,0,1,0,3.39,3.39A3.39,3.39,0,0,0,13.08,10.85Zm.49,3.39v1.27h-.85V14.25h-.85l1.27-1.7,1.27,1.7Z"
        />
    </svg>
)
// 还款
const repayment = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M17.45,16l-4-6a.87.87,0,0,0-.75-.43l-6.52,0a.87.87,0,0,0,0,1.73H8.64v1H5.08l-3-4.59a.87.87,0,0,0-1.38,1l3.56,5.5a.85.85,0,0,0,.17.17,1.3,1.3,0,0,0,1.06.55l.22,0h6.57L13.09,16"
        />
        <path
            fill="currentColor"
            d="M9.63,1.22a3.46,3.46,0,1,0,3.46,3.46A3.46,3.46,0,0,0,9.63,1.22ZM10.71,5a.24.24,0,0,1,0,.48H9.86v.64a.24.24,0,0,1-.47,0h0V5.51H8.55a.24.24,0,1,1,0-.48h.84V4.66H8.55a.24.24,0,1,1,0-.48h.64L8.53,3.4a.24.24,0,1,1,.36-.29l.75.9.75-.9a.24.24,0,0,1,.36.31l-.65.77h.6a.24.24,0,0,1,0,.48H9.86V5Z"
        />
    </svg>
)
// 现金资产
const cash = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <ellipse
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            cx="7.91"
            cy="4.19"
            rx="5.62"
            ry="2.04"
        />
        <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            d="M8.61,8.69l-.7,0c-3.1,0-5.62-.91-5.62-2"
        />
        <rect fill="currentColor" x="1.79" y="4.21" width="1" height="2.5" />
        <rect fill="currentColor" x="13.03" y="4.21" width="1" height="2.5" />
        <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            d="M8.45,13.3l-.87,0c-3.1,0-5.62-.91-5.62-2a1,1,0,0,1,.28-.64"
        />
        <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            d="M10.73,15.45a13.44,13.44,0,0,1-3.15.35c-3.1,0-5.62-.91-5.62-2"
        />
        <rect fill="currentColor" x="1.46" y="11.31" width="1" height="2.5" />
        <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            d="M8.57,8.79l-.67.07c-.42,0-.86.06-1.32.06C3.48,8.92,1,8,1,6.88c0-.5.5-1,1.32-1.31"
        />
        <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            d="M7.93,11.34c-.43,0-.88.06-1.34.06-3.1,0-5.62-.91-5.62-2"
        />
        <polygon fill="currentColor" points="1.48 9.46 0.47 9.43 0.49 6.77 1.48 6.86 1.48 9.46" />
        <path
            fill="currentColor"
            d="M12.58,6.23a5,5,0,1,0,5,5A5,5,0,0,0,12.58,6.23Zm1.51,5.54a.33.33,0,0,1,0,.67H12.9v.9a.33.33,0,0,1-.66,0h0v-.89H11.07a.33.33,0,1,1,0-.67h1.17v-.51H11.07a.33.33,0,1,1,0-.67H12L11,9.48a.33.33,0,1,1,.5-.4l1.05,1.26,1.05-1.26a.33.33,0,0,1,.51.43l-.91,1.07h.84a.33.33,0,0,1,0,.67H12.9v.51Z"
        />
    </svg>
)
// 合作企业管理
const relation = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path
            fill="currentColor"
            d="M16.07,5.38H11.6a.28.28,0,0,0,0,.56h4.47a.28.28,0,0,0,0-.56Z"
        />
        <path
            fill="currentColor"
            d="M16.07,7.33H11.6a.28.28,0,0,0,0,.56h4.47a.28.28,0,0,0,0-.56Z"
        />
        <path
            fill="currentColor"
            d="M16.07,9.57H11.6a.28.28,0,0,0,0,.56h4.47a.28.28,0,0,0,0-.56Z"
        />
        <path
            fill="currentColor"
            d="M16.07,11.53H12.72a.28.28,0,0,0,0,.56h3.35a.28.28,0,0,0,0-.56Z"
        />
        <circle fill="currentColor" cx="6.01" cy="7.61" r="3.63" />
        <path
            fill="currentColor"
            d="M6,10.95A5.88,5.88,0,0,0,.19,17.64H11.82A5.88,5.88,0,0,0,6,10.95Z"
        />
        <path
            fill="none"
            stroke="currentColor"
            d="M5.3,3.47V2a1.05,1.05,0,0,1,1.05-1H16.49a.84.84,0,0,1,.84.84V16.34a1.05,1.05,0,0,1-1,1H13"
        />
    </svg>
)

const iconMap = {
    upload,
    setting,
    notice,
    payZnbell,
    payBalance,
    certification,
    assets,
    payable,
    receivable,
    accept,
    finance,
    repayment,
    cash,
    relation,
    reconcile,
}

const SvgIcon = ({ icon, ...props }) => <Icon component={iconMap[icon]} {...props} />

SvgIcon.propTypes = {
    icon: PropTypes.string.isRequired,
}

export default SvgIcon
