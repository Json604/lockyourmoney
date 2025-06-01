import React, { forwardRef, useCallback, useContext } from "react";
import {BottomSheetModal,BottomSheetView,BottomSheetBackdrop,} from "@gorhom/bottom-sheet";
import { ThemeContext } from "../../context/useTheme";

type Props = {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  backgroundColor?: string;
  indicatorColor?: string;
  onChange?: (index: number) => void;
};


const CommonBottomSheet = forwardRef<BottomSheetModal, Props>(
  (
    {
      children,
      snapPoints = ["25%", "50%"],
      backgroundColor,
      indicatorColor,
      onChange,
    },
    ref
  ) => {
    const {scrollCard,subtext} = useContext(ThemeContext);
    
    const handleSheetChanges = useCallback(
      (index: number) => {
        if (onChange) onChange(index);
      },
      [onChange]
    );

    return (
      <BottomSheetModal
        ref={ref}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={0}
        backgroundStyle={{
          backgroundColor:scrollCard,
          borderRadius: 30,
        }}
        handleIndicatorStyle={{ backgroundColor: subtext }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={{ flex: 1, padding: 16 }}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default CommonBottomSheet;



                    // <BottomSheetModal
                    // ref={bottomSheetModalRef}
                    // onChange={handleSheetChanges}
                    // snapPoints={['45%','60%']}
                    // index={1}
                    // backgroundStyle={{backgroundColor:scrollCard, borderRadius:30,}}
                    // handleIndicatorStyle={{backgroundColor:subtext}}
                    // backdropComponent={(props) => (
                    //     <BottomSheetBackdrop
                    //     {...props}
                    //     disappearsOnIndex={-1}   
                    //     appearsOnIndex={0}       
                    //     pressBehavior="close"    
                    //     />
                    // )}
                    // >
                    //     <BottomSheetView style={[styles.goalModal]}>
                    //         <Text style={{color:text}}>Add goal</Text>
                    //     </BottomSheetView>
                    // </BottomSheetModal>