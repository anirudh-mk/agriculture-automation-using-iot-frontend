import { View, Text } from 'react-native'
import React from 'react'

const TextButton = ({ color, height, width, top, border_radious, name, text_color }) => {
  return (
        <View style={{ 
            width:width, 
            height:height, 
            top:top, 
            borderRadius:border_radious, 
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:color,
            }}>
            <Text style={{color:text_color}}>{name}</Text>
        </View>
  )
}

export default TextButton