// Hooks
import { useEffect, useState } from 'react'
// import { useElapsedTime } from 'use-elapsed-time'
import useFirebase from '../../../hooks/useFirebase'
import useLocalStorage from '../../../hooks/useLocalStorage'
import useToggle from '../../../hooks/useToggle'

// Next
import { useRouter } from 'next/router'

// Firebase
import { getFirebaseDoc } from '../../../firebase/index'

// Components
import Layout from '../../../components/Layout'
import ProtectedRoute from '../../../components/ProtectedRoute'
import Grid from '../../../components/Grid'
import Button from '../../../components/Button'
import Label from '../../../components/Label'
import Page from '../../../components/Page'
import {Widget} from '../../../components/Widget'

// Modules
import moment from 'moment'
import { uniqueId } from 'lodash'
import { motion } from 'framer-motion'

// const Timer = ({ pause }) => {
//   const { elapsedTime } = useElapsedTime({ isPlaying: pause, updateInterval: 1 })
//   return elapsedTime + ' seconds'
// }

export default ({}) => {
  const router = useRouter()

  const [_user] = useLocalStorage('_user')

  const [report, set] = useState()
  const [pause, setPause] = useToggle(true)
  const [templates] = useFirebase([], '/recipe_templates/')

  const setFieldStatus = (category_id, field_id, status) => {
    set(state => {
      return {
        ...state,
        [category_id]: {
          ...state[category_id],
          fields: state[category_id].fields.map(item => (item.id == field_id ? { ...item, status } : item))
        }
      }
    })
  }

  useEffect(async () => {
    if (router.query.id) {
      const _report = await getFirebaseDoc('recipe_templates/', router.query.id)
      // const _template = templates.find(t => t.name == _report.report_code)
      const _template = templates.find(t => t.id == _report.id)

      if (_report && _template)
        set({ ..._report, template: _template })
    }
  }, [router, templates])

  return (
    <ProtectedRoute>
      <>
        {report && (
          <>
            {/* <Page title={report.report_code} icon='file'> */}
              <Button onClick={setPause}>{pause ? 'Pause Job' : 'Resume Job'}</Button>
            {/* </Page> */}

            <Grid columns={1}>
              <Widget title='Your Report' icon='file'>
                <Grid columns={4}>
                  <div>
                    <Label text='Technician' />
                    {/* <p>{report.technician.name}</p> */}
                  </div>
                  <div>
                    <Label text='Odometer Reading' />
                    {/* {report.odometer_reading} {report.odometer_measurement} */}
                  </div>
                  <div>
                    <Label text='Registration Number' />
                    {/* {report.registration_number} */}
                  </div>
                  <div>
                    <Label text='Date' />
                    {moment(report.created_at.toDate()).format('DD/MM/YYYY')}
                  </div>
                  <div>
                    <Label text='Tachograph Calibration' />
                    {/* {report.tachograph_calibration_date ?? 'N/A'} */}
                  </div>
                  <div>
                    <Label text='Elapsed Time' />
                    {/* <Timer pause={pause} /> */}
                  </div>
                  <div>
                    <Label text='Fuel Level' />
                    0%
                  </div>
                </Grid>
              </Widget>
              <Widget title='Important Message' icon='bell-on'>
                <p>* Refers to vehicle and trailer combinations</p>
                <p>
                  ** Refer to popular FORS Elements - please note: it is not a complete representation and reference
                  should be made to your FORS accreditation level
                </p>
              </Widget>

              <Widget title='Fields'>
                <Grid columns={1}>
                  {/* {Object.values(report.template.fields).map((_report, index) => {
                    return (
                      <div key={index} className='border p-2 rounded'>
                        <Label text={_report.name} />
                        <Grid columns={2}>
                          {_report &&
                            _report.fields.map((field, index) => {
                              const id = uniqueId()

                              let classes = ''

                              switch (field.status) {
                                case 'pass':
                                  classes = 'bg-emerald-200 text-emerald-900'
                                  break
                                case 'fail':
                                  classes = 'bg-red-200 text-red-900'
                                  break
                                case 'fail':
                                  classes = 'bg-red-200 text-red-900'
                                  break
                                default:
                                  classes = 'bg-gray-100 text-gray-800'
                              }

                              return (
                                <div
                                  className={
                                    classes + ' flex flex-col h-28 items-center justify-center relative w-full'
                                  }
                                >
                                  <p>{field.id}</p>

                                  <Button onClick={() => alert(JSON.stringify(_report.fields))}>O</Button>

                                  {field.im_code && <p className='font-medium text-xs'>IM Code: {field.im_code}</p>}
                                  <div className='absolute bg-gray-200 -bottom-2 flex h-10 items-center justify-center left-1/2 rounded space-x-4 transform -translate-x-1/2 w-4/5'>
                                    {report.template.checks.find(i => i.name == 'pass') && (
                                      <Button onClick={() => setFieldStatus(report.id, field.id, 'pass')}>Pass</Button>
                                    )}
                                    {report.template.checks.find(i => i.name == 'defect') && (
                                      <Button onClick={() => setFieldStatus(report.id, field.id, 'defect')}>
                                        Defect
                                      </Button>
                                    )}
                                    {report.template.checks.find(i => i.name == 'monitor') && (
                                      <Button onClick={() => setFieldStatus(report.id, field.id, 'monitor')}>
                                        Monitor
                                      </Button>
                                    )}
                                    {report.template.checks.find(i => i.name == 'n/a') && (
                                      <Button onClick={() => setFieldStatus(report.id, field.id, 'n/a')}>N/A</Button>
                                    )}
                                    {report.template.checks.find(i => i.name == 'n/c') && (
                                      <Button onClick={() => setFieldStatus(report.id, field.id, 'n/c')}>N/C</Button>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                        </Grid>
                      </div>
                    )
                  })} */}
                </Grid>
              </Widget>
            </Grid>
          </>
        )}
      </>
    </ProtectedRoute>
  )
}
