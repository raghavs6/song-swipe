//Import and type defenitions
//use client is using browser apis, without it we would get errors about windows and documents it tells Next.js that this is ru in the browser not the server
'use client'

//
import {motion, useMotionValue, useTransform} from 'framer-motion'
import {useState,useEffect, useRef} from 'react'
import Image from 'next/image'

interface Track{
id: String
name: string
artists: {name: string}[]
album: {
    name: string
    images: {url: string; height: number; width: number}[]
}
preview_url: string | null

}
